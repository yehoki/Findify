import Header from './components/header/Header';
import getUserSession from './actions/getUserSession';
import getUserTracks from './actions/getUserTracks';
import DisplaySingleTrack from './components/tracks/DisplaySingleTrack';
import getUserArtists from './actions/getUserArtists';
import getUserGenres from './actions/getUserGenres';
export default async function Home() {
  const session = await getUserSession();

  const userTracks = await getUserTracks();
  const topUserArtists = await getUserArtists();
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
      <Header isLoggedIn={session ? true : false} />
      <main
        className="text-spotifyGreen
        w-full
        h-5/6
      p-2
      grid
      md:grid-cols-10
      lg:grid-cols-8
      gap-2 
      "
      >
        <section
          className="bg-spotifyBlack
  hidden md:block
  md:col-span-4 lg:col-span-2  rounded-lg
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
          col-span-full md:col-span-6 rounded-lg
          p-4
          overflow-x-hidden
        "
        >
          <h3>Your Top Tracks</h3>
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
          <div
            className="w-full border-neutral-800 border
          rounded-lg flex gap-2 overflow-x-auto
          pb-8
          "
          >
            {displayUserGenres()}
          </div>
        </section>
      </main>
    </>
  );
}
