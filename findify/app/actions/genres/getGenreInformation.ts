import { FullSearchResults } from '@/app/components/search/Search';
import getUserSession from '../user/getUserSession';
import { parseGenre } from '@/app/config/helper';

export default async function getGenreInformation(genre: string) {
  try {
    const currentUser = await getUserSession();
    if (!currentUser) {
      return null;
    }
    const spotifyBaseURL = 'https://api.spotify.com/v1/search';
    const res = await fetch(
      `${spotifyBaseURL}?q=genre:${parseGenre(genre)}&type=artist&limit=50`,
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
    if (!searchData) {
      return null;
    }
    return searchData;
  } catch (err) {
    console.error(err);
  }
}
