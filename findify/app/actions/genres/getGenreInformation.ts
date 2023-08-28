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
    if (!searchData.artists.next) {
      return searchData.artists.items;
    }
    const secondRes = await fetch(searchData.artists.next, {
      headers: {
        Authorization: `Bearer ${currentUser.user.accessToken}`,
      },
      method: 'GET',
    });
    if (!secondRes) {
      return searchData.artists.items;
    }
    const secondSearchData: FullSearchResults = await secondRes.json();
    if (!secondSearchData) {
      return searchData.artists.items;
    }
    return [...searchData.artists.items, ...secondSearchData.artists.items];
  } catch (err) {
    console.error(err);
  }
}
