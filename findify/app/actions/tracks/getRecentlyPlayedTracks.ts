import { RecentlyPlayedTracks } from '@/app/types/SpotifyTypes';
import getUserSession from '../user/getUserSession';

export default async function getRecentlyPlayedTracks(
  limit = 50,
  before = new Date().getTime()
) {
  try {
    const currentUser = await getUserSession();
    if (!currentUser) {
      return null;
    }
    const spotifyBaseURL =
      'https://api.spotify.com/v1/me/player/recently-played';
    const res = await fetch(
      `${spotifyBaseURL}?limit=${limit}&before=${before}`,
      {
        headers: {
          Authorization: `Bearer ${
            currentUser.user.accessToken ? currentUser.user.accessToken : ''
          }`,
        },
        method: 'GET',
      }
    );
    if (res.status === 403 || res.status === 504) {
      return 'UserManagement';
    }
    if (!res.ok) {
      return null;
    }

    const recentlyPlayedTracks: RecentlyPlayedTracks = await res.json();
    if (!recentlyPlayedTracks) {
      return null;
    }
    return recentlyPlayedTracks;
  } catch (err) {
    console.error(err);
    return null;
  }
}
