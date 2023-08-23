import getUserSession from './actions/getUserSession';
import getUserTracks from './actions/getUserTracks';
import getUserArtists from './actions/getUserArtists';
import getUserGenres from './actions/getUserGenres';
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
      {/* <ClientCheckSession /> */}
      {/* <Header isLoggedIn={session ? true : false} /> */}
      {/* <main className="grid grid-cols-2 grid-rows-2">
        <div className="col-span-1 row-span-1  bg-blue-300">Home</div>
        <div className="col-span-1 row-start-2  bg-pink-300">List</div>
        <div className="col-span-1 row-span-2 bg-yellow-400">main</div>
      </main> */}
      <main
        className="text-spotifyGreen
        w-full
        h-full
      md:p-2
      flex flex-col
      md:grid
      grid-rows-16
      grid-cols-12
      md:gap-2
      "
      >
        <section
          className="hidden md:block col-span-4 lg:col-span-3 2xl:col-span-2 row-span-2
        bg-spotifyBlack md:rounded-lg
        "
        >
          <Menu />
        </section>
        <section
          className="bg-spotifyBlack
        row-start-3 row-end-[17]
  col-span-4 lg:col-span-3 2xl:col-span-2 md:rounded-lg
  hidden md:block
  
        "
        >
          <ul className="mx-auto w-3/4 text-center pt-12 flex flex-col gap-2">
            <li>Get user tracks</li>
            <li>Get user artists</li>
            <li>Single track display</li>
          </ul>
        </section>
        <section
          className="bg-spotifyBlack
          h-full
          col-span-8 lg:col-span-9 2xl:col-span-10 row-span-full
          md:rounded-lg md:p-4
          overflow-x-hidden"
        >
          <header
            className="bg-black md:bg-spotifyBlack py-4 md:py-0 md:h-16 w-full
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
              <Suspense fallback={<p>Getting genres...</p>}>
                <UserGenres session={session} />
              </Suspense>
            </div>
          </div>

          {/* 
          <div
            className="w-full border-neutral-800 border
          rounded-lg flex gap-2 overflow-x-auto
          pb-8
          "
          >
            {userTracks ? (
              userTracks.items.map((userTrack) => {
                return (
                  <DisplaySingleTrack
                    name={userTrack.name}
                    key={userTrack.id}
                    artists={userTrack.artists.map((artist) => artist.name)}
                    imageUrl={userTrack.album.images[0].url}
                  />
                );
              })
            ) : (
              <></>
            )}
          </div>
          <h3>Your Top Artists</h3>
          <div
            className="w-full border-neutral-800 border
          rounded-lg flex gap-2 overflow-x-auto
          pb-8
          "
          >
            {topUserArtists ? (
              topUserArtists.items.map((userArtist) => {
                return (
                  <DisplaySingleTrack
                    name={userArtist.name}
                    key={userArtist.id}
                    artists={[]}
                    imageUrl={userArtist.images[0].url}
                  />
                );
              })
            ) : (
              <></>
            )}
          </div>
          <h3>Your Top Artists</h3>
          <div
            className="w-full border-neutral-800 border
          rounded-lg flex gap-2 overflow-x-auto
          pb-8
          "
          >
            {topUserArtists ? (
              topUserArtists.items.map((userArtist) => {
                return (
                  <DisplaySingleTrack
                    name={userArtist.name}
                    key={userArtist.id}
                    artists={[]}
                    imageUrl={userArtist.images[0].url}
                  />
                );
              })
            ) : (
              <></>
            )}
          </div>
          <h3>Your Top Artists</h3>
          <div
            className="w-full border-neutral-800 border
          rounded-lg flex gap-2 overflow-x-auto
          pb-8
          "
          >
            {topUserArtists ? (
              topUserArtists.items.map((userArtist) => {
                return (
                  <DisplaySingleTrack
                    name={userArtist.name}
                    key={userArtist.id}
                    artists={[]}
                    imageUrl={userArtist.images[0].url}
                  />
                );
              })
            ) : (
              <></>
            )}
          </div>
          <div
            className="w-full border-neutral-800 border
          rounded-lg flex gap-2 overflow-x-auto
          pb-8
          "
          >
            {displayUserGenres()}
          </div> */}
        </section>
      </main>
    </>
  );
}
