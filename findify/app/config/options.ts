import { NextAuthOptions } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

export const options: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET as string,
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENTID as string,
      clientSecret: process.env.SPOTIFY_SECRET as string,
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
    async session({ session, token, user }) {
      const newSession = {
        expires: session.expires,
        user: {
          ...session.user,
          tokenId: token.id,
          accessToken: token.accessToken,
        },
      };
      return newSession;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    signIn({ account, profile, user }) {
      console.log(account, profile, user);
      return true;
    },
  },
};
