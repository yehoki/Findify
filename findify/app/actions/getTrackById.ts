import { TrackObject } from '../types/SpotifyTypes';
import getUserSession from './getUserSession';

export default async function getTrackById(trackId: string) {
  try {
    const currentUser = await getUserSession();
    if (!currentUser || trackId === '') {
      console.log('No current user or track Id is empty');
      return null;
    }
    const spotifyBaseURL = 'https://api.spotify.com/v1/tracks';

    const res = await fetch(`${spotifyBaseURL}/${trackId}`, {
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
    const singleTrack: TrackObject = await res.json();
    return singleTrack;
  } catch (err: any) {
    console.log(err);
    return null;
  }
}
