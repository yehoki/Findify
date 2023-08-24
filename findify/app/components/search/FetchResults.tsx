import { Session } from 'next-auth';
import { FullSearchResults } from './Search';
import getSearchFromQuery from '@/app/actions/getSearchFromQuery';
import MyTracksCarousel from '../carousels/MyTracksCarousel';

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

  const spotifyBaseURL = 'https://api.spotify.com/v1/search';
  const res = await fetch(
    `${spotifyBaseURL}?q=${searchQuery}&type=album,track,artist&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${
          session.user.accessToken ? session.user.accessToken : ''
        }`,
      },
      method: 'GET',
    }
  );

  const searchData = await getSearchFromQuery(searchQuery);

  return (
    <div>
      <div>
        {searchData && searchData.tracks.href !== '' && (
          <MyTracksCarousel myTracks={searchData.tracks.items} />
        )}
      </div>
    </div>
  );
};

export default FetchResults;
