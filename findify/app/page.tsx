export const dynamic = 'force-dynamic';

import getUserSession from './actions/user/getUserSession';
import HeaderUserProfile from './components/HeaderUserProfile';
import UserTracks from './components/tracks/UserTracks';
import { Suspense } from 'react';
import EmptyTracksState from './components/tracks/EmptyTracksState';
import UserArtists from './components/artists/UserArtists';
import EmptyArtistsState from './components/artists/EmptyArtistsState';
import MobileHeader from './components/header/MobileHeader';
import UserGenres from './components/genres/UserGenres';
import EmptyGenreState from './components/genres/EmptyGenreState';
import RecentlyPlayedTracks from './components/tracks/RecentlyPlayed/RecentlyPlayedTracks';

interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const Home: React.FC<HomeProps> = async ({ searchParams }) => {
  const session = await getUserSession();

  return (
    <>
      <header
        className="bg-black md:bg-spotifyBlackBase py-4 md:py-0 md:h-16 w-full
          flex justify-between items-center md:block
          relative
          "
      >
        <HeaderUserProfile session={session} />
        <MobileHeader session={session} />
      </header>
      <div className="mt-10 md:mt-0">
        <div className="py-4 overflow-x-hidden">
          <Suspense fallback={<EmptyTracksState />}>
            <UserTracks session={session} />
          </Suspense>
        </div>
        <div className="py-4 overflow-x-hidden ">
          <Suspense fallback={<EmptyArtistsState />}>
            <UserArtists session={session} />
          </Suspense>
        </div>
        <div className="py-4">
          <Suspense fallback={<EmptyGenreState />}>
            <UserGenres session={session} />
          </Suspense>
        </div>
        <RecentlyPlayedTracks session={session} />
      </div>
    </>
  );
};

export default Home;
