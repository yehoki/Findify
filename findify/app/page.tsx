import Header from './components/header/Header';
import getUserSession from './actions/getUserSession';
import getUserTracks from './actions/getUserTracks';
import DisplaySingleTrack from './components/tracks/DisplaySingleTrack';
import getUserArtists from './actions/getUserArtists';
import getUserGenres from './actions/getUserGenres';
import Carousel from './components/Carousel';
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai';
import MyTracksCarousel from './components/carousels/MyTracksCarousel';
import Login from './components/Login';
import MyArtistsCarousel from './components/carousels/MyArtistsCarousel';
import Image from 'next/image';
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
      p-2
      grid
      grid-rows-6
      grid-cols-12
      gap-2 
      "
      >
        <section
          className="col-span-4 lg:col-span-3 2xl:col-span-2 row-span-1
        bg-spotifyBlack rounded-lg
        "
        >
          <div
            className="text-[#b3b3b3] hover:text-white transition 
          flex gap-2 items-center"
          >
            <AiFillHome size={24} />
            <span>Home</span>
            <Login isLoggedIn={session ? true : false} />
          </div>
          <div
            className="text-[#b3b3b3] hover:text-white transition 
          flex gap-2 items-center"
          >
            <AiOutlineSearch size={24} />
            <span>Search</span>
          </div>
          <div></div>
        </section>
        <section
          className="bg-spotifyBlack
        row-start-2 row-end-7
  col-span-4 lg:col-span-3 2xl:col-span-2 rounded-lg
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
          col-span-8 lg:col-span-9 2xl:col-span-10 row-span-6   
          rounded-lg p-4
          overflow-x-hidden"
        >
          <header className="w-ful h-12 relative">
            <div className="absolute right-2 top-2">
              <div className="rounded-full bg-purple-300 w-6 h-6 p-1 border-4 border-black cursor-pointer active:opacity-75">
                <Image
                  src={
                    session?.user.image
                      ? session.user.image
                      : '/images/spotify-icon.png'
                  }
                  fill
                  alt="User image"
                  className="rounded-full"
                />
              </div>
            </div>
          </header>
          <div className="py-4 overflow-x-hidden">
            <MyTracksCarousel myTracks={userTracks ? userTracks.items : []} />
          </div>
          <div className="py-4 overflow-x-hidden">
            <MyArtistsCarousel
              myArtists={topUserArtists ? topUserArtists.items : []}
            />
          </div>
          <div className="py-4 overflow-x-hidden">
            <MyArtistsCarousel
              myArtists={topUserArtists ? topUserArtists.items : []}
            />
          </div>
          <div className="py-4 overflow-x-hidden">
            <MyArtistsCarousel
              myArtists={topUserArtists ? topUserArtists.items : []}
            />
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
