import getRecentlyPlayedTracks from '@/app/actions/tracks/getRecentlyPlayedTracks';
import getTrackRecommendations from '@/app/actions/tracks/getTrackRecommendations';
import { parseArtists } from '@/app/config/helper';
import Image from 'next/image';
import Link from 'next/link';

interface TrackRecommendationsProps {}

const TrackRecommendations: React.FC<
  TrackRecommendationsProps
> = async ({}) => {
  const recentlyPlayedTracks = await getRecentlyPlayedTracks();
  if (!recentlyPlayedTracks) {
    return <div>:/</div>;
  }
  const recommendations = await getTrackRecommendations(
    50,
    recentlyPlayedTracks.items
      .map((track) => track.track.id)
      .slice(0, 5)
      .join(',')
  );

  if (!recommendations) {
    return <div> :/</div>;
  }
  return (
    <>
      <section
        className="group px-2 py-1 mt-4 mx-2 rounded-md
      hover:bg-[#1a1a1a] transition duration-300
      "
      >
        <Link href="/recommendations">
          <p className="text-lg text-white font-semibold">
            Song Recommendations
          </p>
          <p className="text-spotifyOffWhite text-sm">By you — for you</p>
        </Link>
      </section>
      <h2 className="text-white text-lg font-semibold mt-4 px-4">
        Check these out
      </h2>
      <h3 className="text-spotifyOffWhite px-4 text-sm">
        Based on your listening history
      </h3>
      <ul className="px-2 mt-2">
        {recommendations.tracks.slice(0, 7).map((track) => (
          <li
            key={track.id}
            className="mb-2 hover:bg-[#1a1a1a]
            transition duration-300
            px-2 py-1 rounded-md
            "
          >
            <Link className="flex gap-2" href={`/track/${track.id}`}>
              <div className="relative w-[50px] h-[50px] aspect-square">
                <Image
                  src={track.album.images[0].url}
                  alt={`${track.name} album cover`}
                  fill
                  className="rounded-sm"
                />
              </div>
              <div>
                <h5 className="text-white line-clamp-1">{track.name}</h5>
                <p className="text-sm text-spotifyOffWhite line-clamp-1 font-light">
                  {parseArtists(track.artists.map((artist) => artist.name))}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TrackRecommendations;
