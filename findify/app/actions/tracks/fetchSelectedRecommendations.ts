import { RecommendationObject } from '@/app/types/SpotifyTypes';
import { Session } from 'next-auth';

export default async function fetchSelectedRecommendations(
  limit: number,
  session: Session,
  trackId: string,
  targetAcousticness: number,
  targetDanceability: number,
  targetEnergy: number,
  targetInstrumentalness: number,
  targetLiveness: number,
  targetLoudness: number,
  targetPopularity: number,
  targetSpeechiness: number,
  targetTempo: number,
  targetValence: number
) {
  try {
    const spotifyBaseURL = 'https://api.spotify.com/v1/recommendations';
    const targetValues =
      'target_acousticness=' +
      targetAcousticness +
      '&target_danceability=' +
      targetDanceability +
      '&target_energy=' +
      targetEnergy +
      '&target_instrumentalness=' +
      targetInstrumentalness +
      '&target_liveness=' +
      targetLiveness +
      '&target_loudness=' +
      targetLoudness +
      '&target_popularity=' +
      targetPopularity +
      '&target_speechiness=' +
      targetSpeechiness +
      '&target_tempo=' +
      targetTempo +
      '&target_valence=' +
      targetValence;
    const res = await fetch(
      `${spotifyBaseURL}?limit=${limit}&seed_tracks=${trackId}&${targetValues}`,
      {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
        method: 'GET',
      }
    );
    if (!res.ok) {
      return null;
    }
    const recommendations: RecommendationObject = await res.json();
    if (!recommendations) {
      return null;
    }
    return recommendations;
  } catch (err) {
    console.error(err);
    return null;
  }
}
