import getTrackById from '@/app/actions/tracks/getTrackById';
import { convertSecondsToMinutes } from '@/app/config/helper';
import { Session } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { BsSpotify } from 'react-icons/bs';
import SingleTrackArtistList from './SingleTrackArtistList';
import getArtistsTopTracks from '@/app/actions/artists/getArtistsTopTracks';
import SingleTrackPopularity from './SingleTrackPopularity';
import SimilarArtists from './SimilarArtists';
import ArtistTopTracks from '../../artists/ArtistTopTracks';
import { Suspense } from 'react';
import ArtistTopTracksEmptyState from '../../artists/ArtistTopTracksEmptyState';

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
              <span className="font-normal hover:underline">
                <Link href={`/artists/${singleTrack.artists[0].id}`}>
                  {singleTrack.artists[0].name}
                </Link>
              </span>
              <span className="hidden md:block mx-[2px]"> · </span>
              <span className="flex items-center gap-1 flex-wrap">
                <p>{singleTrack.album.name} ·</p>
                <p>{singleTrack.album.release_date.slice(0, 4)} ·</p>
                <p>{convertSecondsToMinutes(singleTrack.duration_ms / 1000)}</p>
                <a
                  className="text-[#3e3e3e] hover:text-spotifyGreen ml-[2px]
    transition"
                  href={`https://open.spotify.com/track/${singleTrack.id}`}
                >
                  <BsSpotify size={24} />
                </a>
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
        <Suspense fallback={<ArtistTopTracksEmptyState />}>
          <ArtistTopTracks artistId={firstArtist.id} heading />
        </Suspense>
        <div className="mt-10 overflow-x-hidden">
          <SimilarArtists artistId={firstArtist.id} />
        </div>
      </div>
    </>
  );
};

export default SingleTrack;
