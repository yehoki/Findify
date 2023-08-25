import getArtistById from '@/app/actions/artists/getArtistById';
import getArtistsTopTracks from '@/app/actions/artists/getArtistsTopTracks';
import getUserSession from '@/app/actions/user/getUserSession';
import HeaderUserProfile from '@/app/components/HeaderUserProfile';
import ArtistTopTracks from '@/app/components/artists/ArtistTopTracks';
import ArtistTopTracksEmptyState from '@/app/components/artists/ArtistTopTracksEmptyState';
import SingleArtist from '@/app/components/artists/SingleArtistRoute/SingleArtist';
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
        <SingleArtist artistId={params.artistId} />

        <div className="mb-4">
          <Suspense fallback={<ArtistTopTracksEmptyState />}>
            <ArtistTopTracks
              artistId={singleArtist.id}
              artistName={singleArtist.name}
            />
          </Suspense>
        </div>
        <div className="px-2 mt-4 overflow-x-hidden">
          <SimilarArtists artistId={singleArtist.id} />
        </div>
      </div>
    </>
  );
};

export default ArtistPage;
