import { RecommendationObject } from '@/app/types/SpotifyTypes';
import getUserSession from '../user/getUserSession';
import next from 'next/types';

export default async function getTrackRecommendations(
  limit = 50,
  tracks: string
) {
  try {
    const currentUser = await getUserSession();
    if (!currentUser) {
      return null;
    }
    const spotifyBaseURL = 'https://api.spotify.com/v1/recommendations';

    const res = await fetch(
      `${spotifyBaseURL}?limit=${limit}&seed_tracks=${tracks}`,
      {
        headers: {
          Authorization: `Bearer ${
            currentUser.user.accessToken ? currentUser.user.accessToken : ''
          }`,
        },
        next: {
          // Revalidate the entry every 5 minutes 
          revalidate: 5 * 60,
        },
        method: 'GET',
      }
    );
    if (!res.ok) {
      return null;
    }
    const trackData: RecommendationObject = await res.json();
    if (!trackData) {
      return null;
    }
    return trackData;
  } catch (error) {
    console.error(error);
    return null;
  }
}
