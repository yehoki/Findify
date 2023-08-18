import Image from 'next/image';
import { signIn, getSession, useSession } from 'next-auth/react';
import Login from './components/Login';
import { getServerSession } from 'next-auth';

import { options } from './config/options';
import getSpotifyInformation from './actions/getSpotifyInformation';
export default async function Home() {
  const session = await getServerSession(options);
  console.log(session);
  if (session) {
    const spotifyData = await getSpotifyInformation();
    console.log(spotifyData);
    return (
      <div className="text-spotifyGreen">
        {JSON.stringify(spotifyData)}
        Logged in
        <Login off />
      </div>
    );
  }
  // console.log(test);
  // if (test) {
  //   return (
  //     <div className="text-spotifyGreen">
  //       Not Logged in
  //       <Login off />
  //     </div>
  //   );
  // }
  // console.log(session);
  return (
    <main className="text-spotifyGreen">
      <header className="w-full py-10">
        <div className="w-[1024px] mx-auto">
          <nav>
            <ul>
              <li>
                <Login off={false} />
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </main>
  );
}
