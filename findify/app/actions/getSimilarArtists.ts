import { ArtistObject } from '../types/SpotifyTypes';
import getUserSession from './getUserSession';

export default async function getSimilarArtists(artistId: string) {
  try {
    const currentUser = await getUserSession();
    if (!currentUser) {
      return null;
    }

    const spotifyBaseUrl = 'https://api.spotify.com/v1/artists'
    const res = await fetch(
      `${spotifyBaseUrl}/${artistId}/related-artists`,
      {
        headers: {
          Authorization: `Bearer ${
            currentUser.user.accessToken ? currentUser.user.accessToken : ''
          }`,
        },
        method: 'GET',
      }
    );

    if (!res.ok) {
      return null;
    }
    const similarArtists: { artists: ArtistObject[] } = await res.json();
    if (!similarArtists) {
      return null;
    }
    return similarArtists;
  } catch (err) {
    console.error(err);
    return null;
  }
}
