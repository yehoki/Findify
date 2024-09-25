import getUserPlaylists from '@/app/actions/user/getUserPlaylists';
import { Session } from 'next-auth';
import SinglePlaylist from './SinglePlaylist';
import MyTrackPlaylists from './MyTrackPlaylists';

interface UserPlaylistsProps {
  session: Session;
}

const UserPlaylists: React.FC<UserPlaylistsProps> = async ({ session }) => {
  const userPlaylists = await getUserPlaylists(50);
  if (!userPlaylists) {
    return <></>;
  }

  return (
    <>
      <h3 className="px-4 text-xl text-white font-semibold mb-4">
        Your Playlists
      </h3>
      <MyTrackPlaylists myPlaylists={userPlaylists} session={session} />
    </>
  );
};
export default UserPlaylists;
