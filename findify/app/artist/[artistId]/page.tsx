import getArtistById from '@/app/actions/artists/getArtistById';
import getArtistsTopTracks from '@/app/actions/artists/getArtistsTopTracks';
import getUserSession from '@/app/actions/user/getUserSession';
import HeaderUserProfile from '@/app/components/HeaderUserProfile';
import ArtistTopTracks from '@/app/components/artists/ArtistTopTracks';
import ArtistTopTracksEmptyState from '@/app/components/artists/ArtistTopTracksEmptyState';
import SingleGenre from '@/app/components/genres/SingleGenre';
import MobileHeader from '@/app/components/header/MobileHeader';
import SimilarArtists from '@/app/components/tracks/SingleTrackRoute/SimilarArtists';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { BsSpotify } from 'react-icons/bs';

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
        <div className="md:flex gap-4 items-center">
          <div
            className="relative min-w-[144px] min-h-[144px]
        w-5/12 h-5/12 rounded-full
        aspect-[1/1]
        max-h-[288px] max-w-[288px]
        mx-auto md:mx-0
        md:mb-4
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
          <div className="hidden md:block">
            <div className="">
              <div className="flex gap-2">
                <h2 className="text-4xl lg:text-5xl font-semibold text-white mb-2">
                  {singleArtist.name}{' '}
                </h2>
              </div>
              <div className="flex gap-2">
                <h3 className="text-sm md:text-base text-spotifyOffWhite pl-1">
                  {/* Converts to commas */}
                  {Intl.NumberFormat('en-US').format(
                    singleArtist.followers.total
                  )}{' '}
                  followers
                </h3>
                <div className="text-[#3e3e3e] hover:text-spotifyGreen transition">
                  <a
                    href={`https://open.spotify.com/artist/${singleArtist.id}`}
                  >
                    <BsSpotify size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className=" md:hidden">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-2 px-4">
              {singleArtist.name}
            </h2>
            <div className="flex gap-2">
              <h3 className=" text-sm md:text-base text-spotifyOffWhite px-4 mb-8">
                {/* Converts to commas */}
                {Intl.NumberFormat('en-US').format(
                  singleArtist.followers.total
                )}{' '}
                followers
              </h3>
              <div className="text-[#3e3e3e] hover:text-spotifyGreen transition">
                <a href={`https://open.spotify.com/artist/${singleArtist.id}`}>
                  <BsSpotify size={24} />
                </a>
              </div>
            </div>
          </div>
          <h4
            className="text-xl font-semibold text-white
          px-4 mb-2"
          >
            Genres
          </h4>
          <ul
            className="flex gap-2 py-1 mx-2 overflow-x-auto 
          mb-16 md:mb-8"
          >
            {singleArtist.genres.map((genre) => (
              <SingleGenre key={genre} label={genre} />
            ))}
          </ul>
          <div className="mb-4">
            <h3 className="text-white font-semibold text-xl px-4">
              Top Tracks by {singleArtist.name}
            </h3>
            <Suspense fallback={<ArtistTopTracksEmptyState />}>
              <ArtistTopTracks artistId={singleArtist.id} />
            </Suspense>
          </div>
          <div className="mt-4 overflow-x-hidden">
            <SimilarArtists artistId={singleArtist.id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistPage;
