import { RecentlyPlayedTracks } from '@/app/types/SpotifyTypes';
import getUserSession from '../user/getUserSession';

export default async function getRecentlyPlayedTracks(limit = 50) {
  try {
    const currentUser = await getUserSession();
    if (!currentUser) {
      return null;
    }
    const spotifyBaseURL =
      'https://api.spotify.com/v1/me/player/recently-played';
    const controller = new AbortController();
    const abortFetch = setTimeout(() => controller.abort(), 1500);
    const res = await fetch(`${spotifyBaseURL}?limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${
          currentUser.user.accessToken ? currentUser.user.accessToken : ''
        }`,
      },
      signal: controller.signal,
      method: 'GET',
    });
    clearTimeout(abortFetch);

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
