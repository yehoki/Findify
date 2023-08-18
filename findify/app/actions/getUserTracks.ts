import getUserSession from './getUserSession';

export default async function getUserTracks() {
  try {
    const currentUser = await getUserSession();
    if (!currentUser) {
      return null;
    }
    const spotifyURL = 'https://api.spotify.com/v1/me';
    const res = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=short_term`, {
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
    const userTracks = await res.json();
    return userTracks;
  } catch (err: any) {
    console.log(err);
    return null;
  }
}
