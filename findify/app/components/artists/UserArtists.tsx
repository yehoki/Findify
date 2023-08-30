import getUserArtists from '@/app/actions/user/getUserArtists';
import { Session } from 'next-auth';
import MyArtistsCarousel from '../carousels/MyArtistsCarousel';
import EmptyArtistsState from './EmptyArtistsState';
import { TimePeriod } from '../TimePeriodSwitch';

interface UserArtistsProps {
  session: Session | null;
  timePeriod: TimePeriod;
}

const UserArtists: React.FC<UserArtistsProps> = async ({
  session,
  timePeriod,
}) => {
  if (!session) {
    return <EmptyArtistsState home={true} />;
  }
  const userArtists = await getUserArtists(50, timePeriod);
  if (!userArtists) {
    return <></>;
  }
  return <MyArtistsCarousel myArtists={userArtists.items} />;
};

export default UserArtists;
