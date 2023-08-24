import { Session } from 'next-auth';
import { FullSearchResults } from './Search';
import getSearchFromQuery from '@/app/actions/getSearchFromQuery';
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
  if (searchQuery === '') {
    return <></>;
  }
  if (!session || !searchQuery || Array.isArray(searchQuery)) {
    return <div>Empty state</div>;
  }

  const searchData = await getSearchFromQuery(searchQuery);

  return (
    <div>
      <div>
        {searchData && searchData.tracks.href !== '' && (
          <MyTracksCarousel
            myTracks={searchData.tracks.items}
            isIndex={false}
            heading="Songs"
          />
        )}
        {searchData && searchData.artists.href !== '' && (
          <MyArtistsCarousel
            myArtists={searchData.artists.items}
            isIndex={false}
            heading="Artists"
          />
        )}
        {searchData && searchData.albums.href !== '' && (
          <MyAlbumsCarousel
            myAlbums={searchData.albums.items}
            isIndex={false}
            heading="Albums"
          />
        )}
      </div>
    </div>
  );
};

export default FetchResults;
