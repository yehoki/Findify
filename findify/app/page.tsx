import Header from './components/header/Header';
import getUserSession from './actions/getUserSession';
import getUserTracks from './actions/getUserTracks';
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
            <li>Tracks</li>
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
          p-20
        "
        >
          <div
            className="w-full border-neutral-800 border
          rounded-lg
          "
          >
            {userTracks.items.map((userTrack: any) => {
              return <div key={userTrack.id}>{userTrack.name}</div>;
            })}
          </div>
        </section>
      </main>
    </>
  );
}
