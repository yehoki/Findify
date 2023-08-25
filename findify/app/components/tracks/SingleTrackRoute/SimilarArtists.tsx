import getSimilarArtists from '@/app/actions/artists/getSimilarArtists';
import MyArtistsCarousel from '../../carousels/MyArtistsCarousel';

interface SimilarArtistsProps {
  artistId: string;
}

const SimilarArtists: React.FC<SimilarArtistsProps> = async ({ artistId }) => {
  const similarArtists = await getSimilarArtists(artistId);

  if (!similarArtists || similarArtists.artists.length === 0) {
    return (
      <div className="text-white px-2">Could not find similar artists</div>
    );
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
