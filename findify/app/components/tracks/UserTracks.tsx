import getUserTracks from '@/app/actions/getUserTracks';
import { Session } from 'next-auth';
import MyTracksCarousel from '../carousels/MyTracksCarousel';
import EmptyTracksState from './EmptyTracksState';

interface UserTracksProps {
  session: Session | null;
}

const UserTracks: React.FC<UserTracksProps> = async ({ session }) => {
  if (!session) {
    return <EmptyTracksState />;
  }
  const userTracks = await getUserTracks(50, 'medium_term');
  return <MyTracksCarousel myTracks={userTracks ? userTracks.items : []} />;
};

export default UserTracks;
