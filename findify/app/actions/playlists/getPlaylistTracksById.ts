import { TrackObject } from '@/app/types/SpotifyTypes';
import { Session } from 'next-auth';
import getUserSession from '../user/getUserSession';

export default async function getPlaylistTracksById(
  playlistId: string,
  session: Session
) {
  try {
    const spotifyBaseURL = 'https://api.spotify.com/v1/playlists';
    const res = await fetch(`${spotifyBaseURL}/${playlistId}/tracks`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });
    if (!res.ok) {
      return null;
    }
    const playlistInfo = await res.json();
    const playlistTracks: TrackObject[] = playlistInfo.items.map(
      (item: { track: TrackObject }) => item.track
    );
    if (!playlistTracks) {
      return null;
    }
    return playlistTracks;
  } catch (err) {
    console.error(err);
    return null;
  }
}
