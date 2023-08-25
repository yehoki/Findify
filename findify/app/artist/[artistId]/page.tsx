import getArtistById from '@/app/actions/artists/getArtistById';
import getArtistsTopTracks from '@/app/actions/artists/getArtistsTopTracks';
import getUserSession from '@/app/actions/user/getUserSession';
import HeaderUserProfile from '@/app/components/HeaderUserProfile';
import ArtistTopTracks from '@/app/components/artists/ArtistTopTracks';
import SingleArtistPopularity from '@/app/components/artists/SingleArtistRoute/SingleArtistPopularity';
import SingleGenre from '@/app/components/genres/SingleGenre';
import MobileHeader from '@/app/components/header/MobileHeader';
import SingleTrackPopularity from '@/app/components/tracks/SingleTrackRoute/SingleTrackPopularity';
import { convertSecondsToMinutes } from '@/app/config/helper';
import Image from 'next/image';
import Link from 'next/link';

interface ArtistPageProps {
  params: { artistId: string };
}

const ArtistPage: React.FC<ArtistPageProps> = async ({ params }) => {
  const session = await getUserSession();
  if (!session) {
    return <div>Not logged in</div>;
  }

  const singleArtist = await getArtistById(params.artistId);

  if (!singleArtist) {
    return <>Artist with id ${params.artistId} could not be found</>;
  }
  const artistTopTracks = await getArtistsTopTracks(singleArtist.id);
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
      <header
        className="bg-black md:bg-spotifyBlackBase py-4 md:py-0 md:h-16 w-full
          flex justify-between items-center md:block
          relative
          "
      >
        <HeaderUserProfile session={session} />
        <MobileHeader session={session} />
      </header>
      <div
        className="mt-16
      px-4"
      >
        <div
          className="relative min-w-[144px] min-h-[144px]
        w-5/12 h-5/12 rounded-full
        aspect-[1/1]
        max-h-[288px] max-w-[288px]
        mx-auto
        "
        >
          {singleArtist.images && (
            <Image
              src={singleArtist.images[0].url}
              alt={`${singleArtist.name} image`}
              fill
              className="rounded-full"
            />
          )}
        </div>
        <div className="">
          <h2 className="text-3xl font-semibold text-white mb-2 px-4">
            {singleArtist.name}
          </h2>
          <h3
            className="text-sm text-spotifyOffWhite px-4
          mb-8"
          >
            {/* Converts to commas */}
            {Intl.NumberFormat('en-US').format(
              singleArtist.followers.total
            )}{' '}
            followers
          </h3>
          <h4
            className="text-xl font-semibold text-white
          px-4 mb-2"
          >
            Genres
          </h4>
          <ul className="flex gap-2 py-1 mx-2 overflow-x-auto mb-16">
            {singleArtist.genres.map((genre) => (
              <SingleGenre key={genre} label={genre} />
            ))}
          </ul>
          <div className="">
            <h3 className="text-white font-semibold text-xl px-4 mb-2">
              Top Tracks by {singleArtist.name}
            </h3>
            <ArtistTopTracks artistId={singleArtist.id} />
          </div>
          <div>Top Albums</div>
          <div>Related artists</div>
        </div>
      </div>
    </>
  );
};

export default ArtistPage;
