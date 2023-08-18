import { options } from '@/app/config/options';
import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

const handler = NextAuth(options);

export { handler as GET, handler as POST };
