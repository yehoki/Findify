import getTrackById from '@/app/actions/getTrackById';
import { convertSecondsToMinutes } from '@/app/config/helper';
import { Session } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { BsSpotify } from 'react-icons/bs';
import SingleTrackArtistList from './SingleTrackArtistList';
import getArtistsTopTracks from '@/app/actions/getArtistsTopTracks';
import SingleTrackPopularity from './SingleTrackPopularity';
import SimilarArtists from './SimilarArtists';

interface SingleTrackProps {
  session: Session | null;
  trackId: string;
}

const SingleTrack: React.FC<SingleTrackProps> = async ({
  session,
  trackId,
}) => {
  const singleTrack = await getTrackById(trackId);
  if (!singleTrack) {
    return <>Could not get track with id {trackId}</>;
  }

  const firstArtist = singleTrack.artists[0];
  const artistTopTracks = await getArtistsTopTracks(firstArtist.id);
  if (!artistTopTracks) {
    return <>Could not get artist top tracks</>;
  }

  const topTracksByPopularity = artistTopTracks.tracks.sort(
    (trackOne, trackTwo) => {
      if (trackOne.popularity < trackTwo.popularity) {
        return 1;
      } else if (trackOne.popularity > trackTwo.popularity) {
        return -1;
      } else {
        return 0;
      }
    }
  );

  return (
    <>
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
            className="text-4xl md:text-4xl lg:text-5xl 
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
              <span className="font-normal">{singleTrack.artists[0].name}</span>
              <span className="hidden md:block mx-[2px]"> · </span>
              <span className="flex items-center gap-[2px] flex-wrap">
                <p>{singleTrack.album.name} ·</p>
                <p>{singleTrack.album.release_date.slice(0, 4)} ·</p>
                <p>{convertSecondsToMinutes(singleTrack.duration_ms / 1000)}</p>
                <Link
                  className="text-[#3e3e3e] hover:text-spotifyGreen ml-[2px]
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
      <SingleTrackArtistList singleTrack={singleTrack} />
      <div className="mt-12 text-white px-2">
        <div className="text-spotifyOffWhite font-light">
          Popular tracks by{' '}
        </div>
        <div className="text-lg font-semibold">
          {singleTrack.artists[0].name}
        </div>
        <ul className="pt-4">
          {topTracksByPopularity.map((track, index) => (
            <li
              key={track.id}
              className="flex justify-between items-center hover:bg-[#313131] 
              rounded-lg px-4 py-2"
            >
              <div
                className="text-spotifyOffWhite 
              flex items-center gap-4"
              >
                {/* <span>{index + 1}</span> {track.name} */}
                <div className="min-w-[20px]">{index + 1}</div>
                <div className="relative w-10 h-10">
                  <Image
                    src={track.album.images[0].url}
                    alt={`${track.album.name} album cover`}
                    fill
                  />
                </div>
                <div className="text-white">
                  <Link href={`/track/${track.id}`} className="hover:underline">
                    {track.name}
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <p className="font-light text-spotifyOffWhite">
                  {convertSecondsToMinutes(track.duration_ms / 1000)}
                </p>
                <SingleTrackPopularity popularity={track.popularity} />
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-10 overflow-x-hidden">
          <SimilarArtists artistId={firstArtist.id} />
        </div>
      </div>
    </>
  );
};

export default SingleTrack;
