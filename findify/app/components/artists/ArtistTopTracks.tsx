import getArtistsTopTracks from '@/app/actions/artists/getArtistsTopTracks';
import { convertSecondsToMinutes } from '@/app/config/helper';
import Image from 'next/image';
import Link from 'next/link';
import SingleTrackPopularity from '../tracks/SingleTrackRoute/SingleTrackPopularity';

interface ArtistTopTracksProps {
  artistId: string;
}

const ArtistTopTracks: React.FC<ArtistTopTracksProps> = async ({
  artistId,
}) => {
  const artistTopTracks = await getArtistsTopTracks(artistId);

  if (!artistTopTracks) {
    return <>Could not get artist top tracks</>;
  }

  const topTracksByPopularity = artistTopTracks.tracks.sort(
    (trackOne, trackTwo) => {
      if (trackOne.popularity < trackTwo.popularity) {
        return 1;
      } else if (trackOne.popularity > trackTwo.popularity) {
        return -1;
      } else {
        return 0;
      }
    }
  );

  return (
    <ul className="pt-4">
      {topTracksByPopularity.map((track, index) => (
        <li
          key={track.id}
          className="flex justify-between items-center hover:bg-[#313131] 
              rounded-lg px-4 py-2"
        >
          <div
            className="text-spotifyOffWhite 
              flex items-center gap-4"
          >
            {/* <span>{index + 1}</span> {track.name} */}
            <div className="min-w-[20px]">{index + 1}</div>
            <div className="relative w-10 h-10">
              <Image
                src={track.album.images[0].url}
                alt={`${track.album.name} album cover`}
                fill
              />
            </div>
            <div className="text-white">
              <Link
                href={`/track/${track.id}`}
                className="hover:underline
                  line-clamp-2
                  "
              >
                {track.name}
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <p className="font-light text-spotifyOffWhite">
              {convertSecondsToMinutes(track.duration_ms / 1000)}
            </p>
            <SingleTrackPopularity popularity={track.popularity} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ArtistTopTracks;
