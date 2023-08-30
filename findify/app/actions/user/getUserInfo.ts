import getUserSession from './getUserSession';

export default async function getUserInfo() {
  try {
    const currentUser = await getUserSession();
    if (!currentUser) {
      return null;
    }
    const spotifyBaseURL = 'https://api.spotify.com/v1/me';
    const res = await fetch(spotifyBaseURL, {
      headers: {
        Authorization: `Bearer ${currentUser.user.accessToken}`,
      },
      method: 'GET',
    });
    if (!res.ok) {
      return null;
    }
    return 'operational';
  } catch (err) {
    console.error(err);
    return null;
  }
}
