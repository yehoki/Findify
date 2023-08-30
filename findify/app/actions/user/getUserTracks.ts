import { MyTopTracks } from '../../types/SpotifyTypes';
import getUserSession from './getUserSession';

export default async function getUserTracks(
  limit = 20,
  timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term',
  offset = 0
) {
  try {
    const currentUser = await getUserSession();
    console.log(currentUser);
    if (!currentUser) {
      return null;
    }
    const spotifyBaseURL = 'https://api.spotify.com/v1/me';
    const res = await fetch(
      `${spotifyBaseURL}/top/tracks?time_range=${timeRange}&limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${
            currentUser.user.accessToken ? currentUser.user.accessToken : ''
          }`,
        },
        method: 'GET',
      }
    );
    console.log(res.status, res.statusText, res.url);
    if (res.status === 403) {
      return 'UserManagement';
    }
    if (!res.ok) {
      return null;
    }
    const userTracks: MyTopTracks = await res.json();
    return userTracks;
  } catch (err: any) {
    console.log(err);
    return null;
  }
}
