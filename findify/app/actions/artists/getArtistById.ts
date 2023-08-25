import getUserSession from '../user/getUserSession';

export default async function getArtistById(artistId: string){
  try {
    const currentUser = await getUserSession();
    if (!currentUser || artistId === '') {
      console.log('No current user or track Id is empty');
      return null;
    }
    const spotifyBaseURL = 'https://api.spotify.com/v1/artists';


    
  } catch(err) {
    console.error(err);
    return null;
  }
}