import Image from 'next/image';
import { signIn, getSession, useSession } from 'next-auth/react';
import Login from './components/Login';
import { getServerSession } from 'next-auth';

import { options } from './config/options';
import getSpotifyInformation from './actions/getSpotifyInformation';
import Header from './components/header/Header';
export default async function Home() {
  const session = await getServerSession(options);
  return (
    <>
      <Header isLoggedIn={session ? true : false} />
      <main
        className="text-spotifyGreen
        w-full
        h-5/6
      p-2
      grid
      sm:grid-cols-10
      lg:grid-cols-8
      gap-2 
      "
      >
        <section
          className="bg-spotifyBlack
  hidden sm:block
  sm:col-span-4 lg:col-span-2  rounded-lg
        "
        >
          <ul>
            <li>Setting 1</li>
            <li>Setting 1</li>
            <li>Setting 1</li>
            <li>Setting 1</li>
            <li>Setting 1</li>
            <li>Setting 1</li>
            <li>Setting 1</li>
            <li>Setting 1</li>
            <li>Setting 1</li>
            <li>Setting 1</li>
          </ul>
        </section>
        <section
          className="bg-spotifyBlack
          col-span-full sm:col-span-6 rounded-lg
        "
        >
          Display information
        </section>
      </main>
    </>
  );
}
