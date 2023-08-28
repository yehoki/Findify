import getArtistsTopTracks from '@/app/actions/artists/getArtistsTopTracks';
import { convertSecondsToMinutes } from '@/app/config/helper';
import Image from 'next/image';
import Link from 'next/link';
import SingleTrackPopularity from '../tracks/SingleTrackRoute/SingleTrackPopularity';
import getArtistById from '@/app/actions/artists/getArtistById';

interface ArtistTopTracksProps {
  artistId: string;
  heading?: boolean;
}

const ArtistTopTracks: React.FC<ArtistTopTracksProps> = async ({
  artistId,
  heading,
}) => {
  const singleArtist = await getArtistById(artistId);
  const artistTopTracks = await getArtistsTopTracks(artistId);

  if (
    !artistTopTracks ||
    artistTopTracks.tracks.length === 0 ||
    !singleArtist
  ) {
    return (
      <div className="text-white px-4">
        Could not get artist&apos;s top tracks...
      </div>
    );
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
    <>
      {!heading && (
        <h3 className="text-white font-semibold text-xl px-4">
          Top Tracks by {singleArtist.name}
        </h3>
      )}
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
    </>
  );
};

export default ArtistTopTracks;
