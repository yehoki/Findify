import getUserArtists from './getUserArtists';
import getUserTracks from './getUserTracks';

export default async function getUserGenres() {
  try {
    const currentUserArtists = await getUserArtists(50, 'long_term', 2);
    if (currentUserArtists === 'UserManagement') {
      return 'UserManagement';
    }
    if (!currentUserArtists) {
      return null;
    }

    let genreMap = new Map<string, number>();

    currentUserArtists.items.forEach((trackItem) => {
      const trackGenres = trackItem.genres;
      trackGenres.forEach((trackGenre) => {
        const checkMap = genreMap.get(trackGenre);
        if (!checkMap) {
          genreMap.set(trackGenre, 1);
        } else {
          genreMap.set(trackGenre, checkMap + 1);
        }
      });
    });

    return genreMap;
  } catch (err: any) {
    console.log(err);
  }
}
