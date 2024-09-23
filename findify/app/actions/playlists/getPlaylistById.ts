import { Session } from 'next-auth';

export default async function getPlaylistById(
  session: Session,
  playlistName: string,
  playlistDescription: string
) {
  try {
    const spotifyBaseURL = 'https://api.spotify.com/v1/users';
    const res = await fetch(
      `${spotifyBaseURL}/${session.user.userId}/playlists`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
        body: JSON.stringify({
          name: playlistName,
          description: playlistDescription,
        }),
      }
    );
    if (!res.ok) {
      return null;
    }
    const playlistInformation = await res.json();
    const { id }: { id: string } = playlistInformation;
    if (!id) {
      return null;
    }
    return id;
  } catch (err) {
    console.error(err);
    return null;
  }
}
