import { ArtistObject } from '../../types/SpotifyTypes';
import getUserSession from '../user/getUserSession';

export default async function getArtistsFromList(artistList: string[]) {
  try {
    const currentUser = await getUserSession();
    if (!currentUser) {
      return null;
    }
    const spotifyBaseUrl = 'https://api.spotify.com/v1/artists';
    const artistIds = artistList.join();
    const res = await fetch(`${spotifyBaseUrl}/?ids=${artistIds}`, {
      headers: {
        Authorization: `Bearer ${
          currentUser.user.accessToken ? currentUser.user.accessToken : ''
        }`,
      },
      method: 'GET',
    });
    if (!res.ok) {
      return null;
    }

    const artistData: {
      artists: ArtistObject[];
    } = await res.json();
    if (!artistData) {
      return null;
    }
    return artistData;
  } catch (err) {
    console.error(err);
    return null;
  }
}
