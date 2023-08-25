import getUserSession from './user/getUserSession';

export default async function getSpotifyInformation() {
  try {
    const currentUser = await getUserSession();
    if (!currentUser) {
      return null;
    }
    const spotifyURL = 'https://api.spotify.com/v1/me';
    console.log(currentUser);
    const res = await fetch(spotifyURL, {
      headers: {
        Authorization: `Bearer ${
          currentUser.user.accessToken ? currentUser.user.accessToken : ''
        }`,
      },
    });
    console.log(res.url, res.ok,)
    if (!res.ok) {
      return null;
    }
    const spotifyData = await res.json();
    return spotifyData;
  } catch (err) {}
}
