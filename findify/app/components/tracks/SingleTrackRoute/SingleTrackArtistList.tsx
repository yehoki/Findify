import getArtistsFromList from '@/app/actions/artists/getArtistsFromList';
import { TrackObject } from '@/app/types/SpotifyTypes';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineUser } from 'react-icons/ai';

interface SingleTrackArtistListProps {
  singleTrack: TrackObject;
}

const SingleTrackArtistList: React.FC<SingleTrackArtistListProps> = async ({
  singleTrack,
}) => {
  const artistIds = singleTrack.artists.map((artist) => artist.id);
  const trackArtists = await getArtistsFromList(artistIds);
  if (!trackArtists) {
    return <>Could not get artist information</>;
  }

  return (
    <div className="mt-12">
      {trackArtists.artists.map((artist) => (
        <div
          key={artist.id}
          className="flex gap-4 p-2 hover:bg-spotifyLighterGray rounded-md
w-full items-center cursor-pointer
      "
        >
          <div className="relative w-20 h-20 rounded-full">
            {artist.images && artist.images[0] && (
              <Image
                src={artist.images[0].url}
                alt={`${artist.name} image`}
                fill
                className="rounded-full"
              />
            )}
            {!artist.images && <AiOutlineUser size={42} />}
          </div>
          <div className="text-white">
            <div>Artist</div>
            <div className="font-semibold hover:underline">
              <Link href={`/artist/${artist.id}`}>{artist.name}</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SingleTrackArtistList;
