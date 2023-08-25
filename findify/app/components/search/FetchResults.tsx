import { Session } from 'next-auth';
import { FullSearchResults } from './Search';
import getSearchFromQuery from '@/app/actions/search/getSearchFromQuery';
import MyTracksCarousel from '../carousels/MyTracksCarousel';
import MyArtistsCarousel from '../carousels/MyArtistsCarousel';
import MyAlbumsCarousel from '../carousels/MyAlbumsCarousel';

interface FetchResultsProps {
  searchQuery: string | string[] | undefined;
  session: Session | null;
}

const FetchResults: React.FC<FetchResultsProps> = async ({
  searchQuery,
  session,
}) => {
  if (searchQuery === '' || !searchQuery) {
    return <></>;
  }
  if (!session || Array.isArray(searchQuery)) {
    return <div>Empty state</div>;
  }

  const searchData = await getSearchFromQuery(searchQuery);

  return (
    <div>
      {searchData && searchData.tracks.href !== '' && (
        <div className="mt-12 md:mt-0 mb-8">
          <MyTracksCarousel
            myTracks={searchData.tracks.items}
            isIndex={false}
            heading="Songs"
          />
        </div>
      )}
      {searchData && searchData.artists.href !== '' && (
        <div className="mt-4 md:mt-0 mb-8">
          <MyArtistsCarousel
            myArtists={searchData.artists.items}
            isIndex={false}
            heading="Artists"
          />
        </div>
      )}
      {searchData && searchData.albums.href !== '' && (
        <div className="mt-4 md:mt-0 mb-8">
          <MyAlbumsCarousel
            myAlbums={searchData.albums.items}
            isIndex={false}
            heading="Albums"
          />
        </div>
      )}
    </div>
  );
};

export default FetchResults;
