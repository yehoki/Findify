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
import RecentlyPlayedTracksLoadingState from './components/tracks/RecentlyPlayed/RecentlyPlayedTracksLoadingState';
import MobileMenuProvider from './providers/MobileMenuProvider';
import TimePeriodSwitch from './components/TimePeriodSwitch';

interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const Home: React.FC<HomeProps> = async ({ searchParams }) => {
  const session = await getUserSession();
  const timePeriod = searchParams.tp;

  const formattedTimePeriod =
    timePeriod &&
    (timePeriod === 'short_term' ||
      timePeriod === 'medium_term' ||
      timePeriod === 'long_term')
      ? timePeriod
      : '';
  return (
    <>
      <header
        className="bg-black md:bg-spotifyBlackBase py-4 md:py-0 md:h-16 w-full
          flex justify-between items-center md:block
          relative
          "
      >
        <HeaderUserProfile session={session} />
        <MobileMenuProvider>
          <MobileHeader session={session} />
        </MobileMenuProvider>
      </header>
      <div className="mt-10 md:mt-0">
        {!session && (
          <>
            <h2 className="px-4 text-xl text-white font-semibold">
              Log in with your Spotify account
            </h2>
            <h3 className="px-4 text-sm text-spotifyOffWhite font-semibold">
              See your top tracks & artists, and get new song recommendations
            </h3>
          </>
        )}
        <TimePeriodSwitch
          timePeriodParam={
            timePeriod &&
            (timePeriod === 'short_term' ||
              timePeriod === 'medium_term' ||
              timePeriod === 'long_term')
              ? timePeriod
              : ''
          }
        />
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
        <Suspense fallback={<RecentlyPlayedTracksLoadingState />}>
          <RecentlyPlayedTracks session={session} />
        </Suspense>
      </div>
    </>
  );
};

export default Home;
