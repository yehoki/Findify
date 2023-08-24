import { FullSearchResults } from '../components/search/Search';
import getUserSession from './getUserSession';

export default async function getSearchFromQuery(query: string) {
  try {
    const currentUser = await getUserSession();
    if (!currentUser) {
      return null;
    }

    const spotifyBaseURL = 'https://api.spotify.com/v1/search';
    const res = await fetch(
      `${spotifyBaseURL}?q=${query}&type=album,track,artist&limit=50`,
      {
        headers: {
          Authorization: `Bearer ${currentUser.user.accessToken}`,
        },
        method: 'GET',
      }
    );
    if (!res.ok) {
      return null;
    }
    const searchData: FullSearchResults = await res.json();

    return searchData;
  } catch (err) {
    console.log(err);
    return null;
  }
}
