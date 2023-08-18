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
    signIn({ account, profile, user }) {
      console.log(account, profile, user);
      return true;
    },
  },
};
