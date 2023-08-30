import getRecentlyPlayedTracks from '@/app/actions/tracks/getRecentlyPlayedTracks';
import { getTimeFromNow, parseArtists } from '@/app/config/helper';
import Image from 'next/image';
import Link from 'next/link';
import DisplayRecentlyPlayedTracks from './DisplayRecentlyPlayedTracks';
import { Session } from 'next-auth';
import RecentlyPlayedTracksLoadingState from './RecentlyPlayedTracksLoadingState';

interface RecentlyPlayedTracksProps {
  session: Session | null;
}

const RecentlyPlayedTracks: React.FC<RecentlyPlayedTracksProps> = async ({
  session,
}) => {
  const recentlyPlayedTracks = await getRecentlyPlayedTracks(20);
  if (recentlyPlayedTracks === 'UserManagement') {
    return <></>;
  }
  if (!recentlyPlayedTracks || !session) {
    return <RecentlyPlayedTracksLoadingState home={true} />;
  }
  return (
    <DisplayRecentlyPlayedTracks
      session={session}
      initialTracks={recentlyPlayedTracks}
    />
  );
};

export default RecentlyPlayedTracks;
