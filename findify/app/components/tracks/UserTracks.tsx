import getUserTracks from '@/app/actions/user/getUserTracks';
import { Session } from 'next-auth';
import MyTracksCarousel from '../carousels/MyTracksCarousel';
import EmptyTracksState from './EmptyTracksState';
import { Suspense } from 'react';

interface UserTracksProps {
  session: Session | null;
}

const UserTracks: React.FC<UserTracksProps> = async ({ session }) => {
  if (!session) {
    return <EmptyTracksState home={true} />;
  }
  const userTracks = await getUserTracks(50, 'medium_term');
  return <MyTracksCarousel myTracks={userTracks ? userTracks.items : []} />;
};

export default UserTracks;
