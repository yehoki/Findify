import getSimilarArtists from '@/app/actions/artists/getSimilarArtists';
import MyArtistsCarousel from '../../carousels/MyArtistsCarousel';

interface SimilarArtistsProps {
  artistId: string;
}

const SimilarArtists: React.FC<SimilarArtistsProps> = async ({ artistId }) => {
  const similarArtists = await getSimilarArtists(artistId);

  if (!similarArtists) {
    return <>Could not find similar artists</>;
  }
  return (
    <MyArtistsCarousel
      isIndex={false}
      heading="Fans also like"
      myArtists={similarArtists.artists}
    />
  );
};

export default SimilarArtists;
