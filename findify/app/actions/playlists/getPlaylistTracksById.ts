import { TrackObject } from '@/app/types/SpotifyTypes';
import { Session } from 'next-auth';
import getUserSession from '../user/getUserSession';

export default async function getPlaylistTracksById(
  playlistId: string,
  session: Session,
  next: string | null = null,
  trackArray: TrackObject[] | null = null
) {
  try {
    const spotifyBaseURL = 'https://api.spotify.com/v1/playlists';
    let connectionString;
    if (next === null) {
      connectionString = `${spotifyBaseURL}/${playlistId}/tracks`;
    } else {
      connectionString = next;
    }
    const res = await fetch(connectionString, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });
    if (!res.ok) {
      return null;
    }
    const playlistInfo: {
      next: string | null;
      items: {
        track: TrackObject;
      }[];
    } = await res.json();
    let playlistTracks: TrackObject[] = playlistInfo.items.map(
      (item) => item.track
    );
    if (!playlistTracks) {
      return null;
    }
    if (trackArray !== null) {
      // If we're passing in an existing track array via recursion, add all tracks to it
      playlistTracks = trackArray.concat(playlistTracks);
    }

    if (playlistInfo.next === null) {
      return playlistTracks;
    } else {
      return getPlaylistTracksById(
        playlistId,
        session,
        playlistInfo.next,
        playlistTracks
      );
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}
