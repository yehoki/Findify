import { getServerSession } from 'next-auth';
import { options } from '../config/options';
import { getSession } from 'next-auth/react';

const getSpotifyInformation = async () => {
  try {
    const currentUser = await getServerSession(options);
    if (!currentUser) {
      return null;
    }
    const spotifyURL = 'https://api.spotify.com/v1/me';
    const res = await fetch(spotifyURL, {
      headers: {
        Authorization: `Bearer ${
          currentUser.user.accessToken ? currentUser.user.accessToken : ''
        }`,
      },
    });
    if(!res.ok){
      return null;
    }
    const spotifyData = await res.json();
    return spotifyData;
  } catch (err) {}
};

export default getSpotifyInformation;
