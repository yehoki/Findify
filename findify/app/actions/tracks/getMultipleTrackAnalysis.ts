import { AudioFeaturesObject } from '@/app/types/SpotifyTypes';
import getUserSession from '../user/getUserSession';

export default async function getMultipleTrackAnalysis(trackIds: string[]) {
  try {
    const currentUser = await getUserSession();
    if (!currentUser) {
      return null;
    }
    const spotifyBaseURL = 'https://api.spotify.com/v1/audio-features';

    const res = await fetch(`${spotifyBaseURL}?ids=${trackIds.join(',')}`, {
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
    const trackAnalysis: {
      audio_features: AudioFeaturesObject[];
    } = await res.json();
    if (!trackAnalysis) {
      return null;
    }
    return trackAnalysis;
  } catch (error) {
    console.error(error);
    return null;
  }
}
