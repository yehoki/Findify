import getUserSession from './actions/user/getUserSession';
import getUserTracks from './actions/user/getUserTracks';
import getUserArtists from './actions/user/getUserArtists';
import getUserGenres from './actions/user/getUserGenres';
import MyArtistsCarousel from './components/carousels/MyArtistsCarousel';
import HeaderUserProfile from './components/HeaderUserProfile';
import Menu from './components/Menu/Menu';
import UserTracks from './components/tracks/UserTracks';
import { Suspense } from 'react';
import EmptyTracksState from './components/tracks/EmptyTracksState';
import UserArtists from './components/artists/UserArtists';
import EmptyArtistsState from './components/artists/EmptyArtistsState';
import MobileHeader from './components/header/MobileHeader';
import UserGenres from './components/genres/UserGenres';
import EmptyGenreState from './components/genres/EmptyGenreState';
export default async function Home() {
  const session = await getUserSession();
  const userTracks = await getUserTracks(50, 'medium_term');
  const topUserArtists = await getUserArtists(50, 'medium_term');
  const topUserGenres = await getUserGenres();

  const displayUserGenres = () => {
    if (!topUserGenres) {
      return <div>No Genres</div>;
    }
    const genreArray: { genre: string; genreCount: number }[] = [];
    topUserGenres.forEach((genreCount, genre) => {
      genreArray.push({ genre: genre, genreCount: genreCount });
    });
    const sortedGenres = genreArray.sort((objOne, objTwo) => {
      if (objOne.genreCount < objTwo.genreCount) {
        return 1;
      } else if (objOne.genreCount > objTwo.genreCount) {
        return -1;
      } else {
        return 0;
      }
    });
    return sortedGenres.map((genreDiv) => (
      <div key={genreDiv.genre}>
        {genreDiv.genre}: {genreDiv.genreCount}
      </div>
    ));
  };
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
      </div>
    </>
  );
}
