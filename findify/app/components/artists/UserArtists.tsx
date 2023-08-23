import getUserArtists from '@/app/actions/getUserArtists';
import { Session } from 'next-auth';
import MyArtistsCarousel from '../carousels/MyArtistsCarousel';
import EmptyArtistsState from './EmptyArtistsState';

interface UserArtistsProps {
  session: Session | null;
}

const UserArtists: React.FC<UserArtistsProps> = async ({ session }) => {
  if (!session) {
    return <EmptyArtistsState />;
  }
  const userArtists = await getUserArtists(50, 'medium_term');

  return <MyArtistsCarousel myArtists={userArtists ? userArtists.items : []} />;
};

export default UserArtists;
