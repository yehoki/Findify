import getRecentlyPlayedTracks from '@/app/actions/tracks/getRecentlyPlayedTracks';
import getTrackRecommendations from '@/app/actions/tracks/getTrackRecommendations';
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
    <div>
      {recommendations.tracks.map((track) => (
        <div key={track.id} className="hover:underline">
          <Link href={`/track/${track.id}`}>{track.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default TrackRecommendations;
