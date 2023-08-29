import { Session } from 'next-auth';

export default async function addSongsToPlaylist(
  session: Session,
  playlistId: string,
  tracks: string[]
) {
  try {
    const spotifyBaseURL = 'https://api.spotify.com/v1/playlists';
    const res = await fetch(`${spotifyBaseURL}/${playlistId}/tracks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      body: JSON.stringify({
        uris: tracks,
      }),
    });
    if (!res.ok) {
      return null;
    }
    const snapshot = await res.json();
    if (!snapshot) {
      return null;
    }
    return snapshot;
  } catch (err) {
    console.error(err);
    return null;
  }
}
