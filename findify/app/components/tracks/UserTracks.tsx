import getUserTracks from '@/app/actions/user/getUserTracks';
import { Session } from 'next-auth';
import MyTracksCarousel from '../carousels/MyTracksCarousel';
import EmptyTracksState from './EmptyTracksState';

interface UserTracksProps {
  session: Session | null;
}

const UserTracks: React.FC<UserTracksProps> = async ({ session }) => {
  if (!session) {
    return <EmptyTracksState home={true} />;
  }
  const userTracks = await getUserTracks(50, 'medium_term');
  if (!userTracks) {
    return (
      <>
        <h2 className="px-4 text-white font-semibold text-xl">
          There has been a problem
        </h2>
        <h3 className="px-4 text-spotifyOffWhite text-lg mb-4">
          Please read the message below for more information
        </h3>
        <p className="px-4 text-spotifyOffWhite text-sm">
          <span className="font-bold text-white">Message from the team:</span>{' '}
          We are still awaiting our extension quota from Spotify&apos;s Web API
          Team.
        </p>
        <p className="px-4 text-spotifyOffWhite text-sm">
          Until then we must control the number of users using our app. Contact
          the{' '}
          <a
            href="https://github.com/yehoki"
            className="underline text-spotifyGreen underline-offset-2"
          >
            project owner
          </a>{' '}
          to be assigned an account.
        </p>
      </>
    );
  }
  return <MyTracksCarousel myTracks={userTracks.items} />;
};

export default UserTracks;
