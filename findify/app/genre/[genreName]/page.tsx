import getGenreInformation from '@/app/actions/genres/getGenreInformation';
import getUserSession from '@/app/actions/user/getUserSession';

interface GenrePageProps {
  params: { genreName: string };
}

const GenrePage: React.FC<GenrePageProps> = async ({ params }) => {
  const session = await getUserSession();
  if (!session) {
    return <div>Not logged in</div>;
  }

  const genreInformation = await getGenreInformation(params.genreName);
  if (!genreInformation) {
    return <>No Genre info</>;
  }

  const topArtists = genreInformation.artists.items.sort((a, b) => {
    if (a.followers.total > b.followers.total) {
      return -1;
    } else if (a.followers.total < b.followers.total) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <div>
      {topArtists.map((artist) => (
        <div key={artist.id}>
          {artist.name}:{artist.followers.total}:{artist.genres[0]}
        </div>
      ))}
      {/* {genreInformation.tracks.items.map((track) => {
        return (
          <div key={track.id}>
            {track.name}: {track.artists[0].name}
          </div>
        );
      })} */}
    </div>
  );
};

export default GenrePage;
