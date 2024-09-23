import getUserSession from '@/app/actions/user/getUserSession';
import MobileMenuProvider from '@/app/providers/MobileMenuProvider';
import HeaderUserProfile from '../components/HeaderUserProfile';
import MobileHeader from '../components/header/MobileHeader';
import UserPlaylists from '../components/playlists/playlists';

export const dynamic = 'force-dynamic';

const PlaylistsPage = async ({}) => {
  const session = await getUserSession();
  if (!session) {
    return <div>Not logged in</div>;
  }

  return (
    <>
      <header
        className="bg-black md:bg-spotifyBlackBase py-4 md:py-0 md:h-16 w-full
          flex justify-between items-center md:block
          relative"
      >
        <HeaderUserProfile session={session} />
        <MobileMenuProvider>
          <MobileHeader session={session} />
        </MobileMenuProvider>
      </header>
      <div>
        <UserPlaylists session={session} />
      </div>
    </>
  );
};

export default PlaylistsPage;
