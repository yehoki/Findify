import getUserPlaylists from '@/app/actions/user/getUserPlaylists';
import { Session } from 'next-auth';
import Image from 'next/image';
import SinglePlaylist from './SinglePlaylist';

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
      {userPlaylists.items.map((playlist) => (
        <SinglePlaylist
          name={playlist.name}
          externalSpotifyUrl={playlist.external_urls.spotify}
          imageUrl={playlist.images[0].url}
        />
      ))}
    </>
  );
};
export default UserPlaylists;
