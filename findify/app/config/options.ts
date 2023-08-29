import { NextAuthOptions, TokenSet } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import { URLSearchParams } from 'url';

const spotifyScope =
  'user-read-recently-played user-read-playback-state user-top-read user-modify-playback-state user-read-currently-playing user-follow-read playlist-read-private user-read-email user-read-private user-library-read playlist-read-collaborative';

export const options: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET as string,
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENTID as string,
      clientSecret: process.env.SPOTIFY_SECRET as string,
      authorization: {
        params: {
          scope: spotifyScope,
        },
      },
      profile(profile) {
        return {
          id: profile.id,
          name: profile.display_name,
          email: profile.email,
          image:
            profile.images && profile.images[0] ? profile.images[0].url : '',
        };
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url;
    },
    async session({ session, token, user }) {
      const newSession = {
        expires: session.expires,
        user: {
          ...session.user,
          userId: token.userId,
          tokenId: token.id,
          accessToken: token.accessToken,
          accessTokenExpiry: token.accessTokenExpiry,
        },
        error: token.error,
      };
      return newSession;
    },
    async jwt({ token, user, account }) {
      const clientId = process.env.SPOTIFY_CLIENTID as string;
      const clientSecret = process.env.SPOTIFY_SECRET as string;
      if (account && user) {
        token.tokenId = user.id;
        token.accessToken = account.access_token;
        token.expiresAt = account.expires_at;
        token.refreshToken = account.refresh_token;
        return token;
      } else if (
        token.expiresAt &&
        Date.now() < (token.expiresAt as number) * 1000
      ) {
        return token;
      } else {
        try {
          const res = await fetch(`https://accounts.spotify.com/api/token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization:
                'Basic ' +
                Buffer.from(clientId + ':' + clientSecret).toString('base64'),
            },
            body: new URLSearchParams({
              refresh_token: token.refreshToken as string,
              grant_type: 'refresh_token',
            }),
          });
          const tokens: TokenSet = await res.json();
          if (!res.ok) throw tokens;
          return {
            ...token,
            userId: user.id,
            accessToken: tokens.access_token,
            expiresAt: tokens.expires_at,
            refreshToken: tokens.refresh_token || token.refreshToken,
          };
        } catch (err) {
          console.error('Error refreshing token', err);
          return { ...token, error: 'RefreshAccessTokenError' as const };
        }
      }
    },
    signIn({ account, profile, user }) {
      return true;
    },
  },
};
