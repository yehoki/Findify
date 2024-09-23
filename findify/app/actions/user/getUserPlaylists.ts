import { MyPlaylists, MyTopArtists } from '../../types/SpotifyTypes';
import getUserSession from './getUserSession';

export default async function getUserPlaylists(
  limit = 20,
  offset = 0
) {
  try {
    const currentUser = await getUserSession();
    if (!currentUser) {
      return null;
    }
    const spotifyBaseURL = 'https://api.spotify.com/v1/me';
    const res = await fetch(
      `${spotifyBaseURL}/playlists?limit=${limit}&offset=${offset}`,
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
    const userPlaylists: MyPlaylists = await res.json();
    return userPlaylists;
  } catch (err: any) {
    console.log(err);
    return null;
  }
}
