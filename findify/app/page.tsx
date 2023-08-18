import Header from './components/header/Header';
import getUserSession from './actions/getUserSession';
import getUserTracks from './actions/getUserTracks';
import DisplaySingleTrack from './components/tracks/DisplaySingleTrack';
export default async function Home() {
  const session = await getUserSession();

  const userTracks = await getUserTracks();
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
          <ul>
            <li>Get user tracks</li>
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
          col-span-full md:col-span-6 rounded-lg
          p-4
          overflow-x-hidden
        "
        >
          <h3>Your Top Tracks</h3>
          <div
            className="w-full border-neutral-800 border
          rounded-lg flex gap-2 overflow-x-auto
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
        </section>
      </main>
    </>
  );
}
