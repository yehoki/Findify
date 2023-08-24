import getTrackById from '@/app/actions/getTrackById';
import getUserSession from '../../actions/getUserSession';
import HeaderUserProfile from '@/app/components/HeaderUserProfile';
import MobileHeader from '@/app/components/header/MobileHeader';
import Image from 'next/image';
import { convertSecondsToMinutes } from '@/app/config/helper';

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
        <div className="flex gap-8">
          <div
            className="relative 
          w-[192px] h-[192px]
          lg:w-[232px] lg:h-[232px]"
          >
            <Image
              src={singleTrack.album.images[0].url}
              fill
              alt={`${singleTrack.name} album cover`}
            />
          </div>
          <div className="text-white">
            <h4 className="mt-12 mb-2">Song</h4>
            <h2 className="text-8xl font-extrabold">{singleTrack.name}</h2>

            <h3 className="mt-8 font-light">
              <span className="font-normal">{singleTrack.artists[0].name}</span>{' '}
              · {singleTrack.album.name} ·{' '}
              {singleTrack.album.release_date.slice(0, 4)} ·{' '}
              {convertSecondsToMinutes(singleTrack.duration_ms / 1000)}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackPage;
