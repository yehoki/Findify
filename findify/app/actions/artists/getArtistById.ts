import { ArtistObject } from '@/app/types/SpotifyTypes';
import getUserSession from '../user/getUserSession';

export default async function getArtistById(artistId: string) {
  try {
    const currentUser = await getUserSession();
    if (!currentUser || artistId === '') {
      console.log('No current user or track Id is empty');
      return null;
    }
    const spotifyBaseURL = 'https://api.spotify.com/v1/artists';
    const res = await fetch(`${spotifyBaseURL}/${artistId}`, {
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

    const singleArtist: ArtistObject = await res.json();
    if (!singleArtist) {
      return null;
    }
    return singleArtist;
  } catch (err) {
    console.error(err);
    return null;
  }
}
