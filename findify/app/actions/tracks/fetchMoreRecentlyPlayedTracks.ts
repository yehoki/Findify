import { RecentlyPlayedTracks } from "@/app/types/SpotifyTypes";

export const fetchMoreTracks = async (
  limit = 20,
  before: number,
  accessToken: string
) => {
  try {
    const spotifyBaseURL =
      'https://api.spotify.com/v1/me/player/recently-played';
    const res = await fetch(
      `${spotifyBaseURL}?limit=${limit}&before=${before}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: 'GET',
      }
    );
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
};
