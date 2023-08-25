export const dynamic = 'force-dynamic';

import getTrackById from '@/app/actions/tracks/getTrackById';
import getUserSession from '../../actions/user/getUserSession';
import HeaderUserProfile from '@/app/components/HeaderUserProfile';
import MobileHeader from '@/app/components/header/MobileHeader';
import Image from 'next/image';
import { convertSecondsToMinutes } from '@/app/config/helper';
import { BsSpotify } from 'react-icons/bs';
import Link from 'next/link';
import { AiOutlineUser } from 'react-icons/ai';
import getArtistsFromList from '@/app/actions/artists/getArtistsFromList';
import SingleTrack from '@/app/components/tracks/SingleTrackRoute/SingleTrack';

interface TrackPageProps {
  params: { trackId: string };
}

const TrackPage: React.FC<TrackPageProps> = async ({ params }) => {
  const session = await getUserSession();
  if (!session) {
    return <div>Not logged in </div>;
  }

  const singleTrack = await getTrackById(params.trackId);
  if (!singleTrack) {
    return <>Could not get track with id {params.trackId}</>;
  }

  const artistIds = singleTrack.artists.map((artist) => artist.id);
  const trackArtists = await getArtistsFromList(artistIds);
  if (!trackArtists) {
    return <>Could not get artist information</>;
  }

  return (
    <>
      <header
        className="bg-black md:bg-spotifyBlackBase py-4 md:py-0 md:h-16 w-full
          flex justify-between items-center md:block
          relative
          "
      >
        <HeaderUserProfile session={session} />
        <MobileHeader session={session} />
      </header>
      <div className="mt-16">
        <SingleTrack session={session} trackId={params.trackId} />
      </div>
    </>
  );
};

export default TrackPage;
