import { TrackObject } from '../types/SpotifyTypes';
import getUserSession from './getUserSession';

export default async function getArtistsTopTracks(artistId: string) {
  try {
    const currentUser = await getUserSession();
    if (!currentUser) {
      return null;
    }

    const spotifyBaseUrl = 'https://api.spotify.com/v1/artists';
    const res = await fetch(
      `${spotifyBaseUrl}/${artistId}/top-tracks?market=GB`,
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
    const topArtistTracks: { tracks: TrackObject[] } = await res.json();
    if (!topArtistTracks) {
      return null;
    }
    return topArtistTracks;
  } catch (err) {
    console.error(err);
    return null;
  }
}
