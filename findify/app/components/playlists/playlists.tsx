import getUserPlaylists from '@/app/actions/user/getUserPlaylists';
import { Session } from 'next-auth';
import Image from 'next/image';

interface UserPlaylistsProps {
  session: Session;
}

const UserPlaylists: React.FC<UserPlaylistsProps> = async ({ session }) => {
  const userPlaylists = await getUserPlaylists(50);
  if (!userPlaylists) {
    return <></>;
  }

  console.log(userPlaylists);
  return (
    <>
      {userPlaylists.items.map((playlist) => (
        <div className="flex flex-row gap-2">
          <div className="relative h-[50px] w-[50px] md:w-[75px] md:h-[75px] mb-4 rounded-md shadow-lg z-0">
            <Image
              src={playlist.images[0].url}
              alt={`${playlist.name} image`}
              fill
            />
          </div>
          <div>
            <a href={playlist.external_urls.spotify} target="_blank">
              {playlist.name}
            </a>
          </div>
        </div>
      ))}
    </>
  );
};
export default UserPlaylists;
