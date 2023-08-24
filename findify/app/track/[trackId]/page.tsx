import getTrackById from '@/app/actions/getTrackById';
import getUserSession from '../../actions/getUserSession';
import HeaderUserProfile from '@/app/components/HeaderUserProfile';
import MobileHeader from '@/app/components/header/MobileHeader';
import Image from 'next/image';
import { convertSecondsToMinutes } from '@/app/config/helper';
import { BsSpotify } from 'react-icons/bs';
import Link from 'next/link';
import { AiOutlineUser } from 'react-icons/ai';
import getArtistsFromList from '@/app/actions/getArtistsFromList';

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
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <div
            className="relative
            mx-auto md:mx-0
          w-[150px] h-[150px]
          md:w-[192px] md:h-[192px]
          lg:w-[232px] lg:h-[232px]
          shadow-md shadow-black
          "
          >
            <Image
              src={singleTrack.album.images[0].url}
              fill
              alt={`${singleTrack.name} album cover`}
            />
          </div>
          <div className="text-white px-4">
            <h4 className="mt-8 lg:mt-12 mb-2 hidden md:block">Song</h4>
            <h2
              className="text-4xl md:text-7xl lg:text-8xl 
            font-semibold md:font-extrabold 
            "
            >
              <span>{singleTrack.name}</span>
            </h2>

            <div className="flex gap-2 mt-2 md:mt-8">
              <h3
                className="font-light 
              flex flex-col md:flex-row
              "
              >
                <span className="font-normal">
                  {singleTrack.artists[0].name}
                </span>
                <span className="hidden md:block mx-[2px]"> · </span>
                <span className="flex gap-2 items-center">
                  {' '}
                  <p>
                    {singleTrack.album.name} ·{' '}
                    {singleTrack.album.release_date.slice(0, 4)} ·{' '}
                    {convertSecondsToMinutes(singleTrack.duration_ms / 1000)}
                  </p>
                  <Link
                    className="text-[#3e3e3e] hover:text-spotifyGreen 
            transition"
                    href={`https://open.spotify.com/track/${singleTrack.id}`}
                  >
                    <BsSpotify size={24} />
                  </Link>
                </span>
              </h3>
            </div>
          </div>
        </div>
        <div className="mt-12">
          {trackArtists.artists.map((artist) => (
            <div
              key={artist.id}
              className="flex gap-4 p-2 hover:bg-spotifyLighterGray rounded-md
              w-1/4 items-center cursor-pointer
              "
            >
              <div className="relative w-20 h-20 rounded-full">
                {artist.images && artist.images[0] && (
                  <Image
                    src={artist.images[0].url}
                    alt={`${artist.name} image`}
                    fill
                    className="rounded-full"
                  />
                )}
                {!artist.images && <AiOutlineUser size={42} />}
              </div>
              <div className="text-white">
                <div>Artist</div>
                <div className="font-semibold hover:underline">
                  {artist.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TrackPage;
