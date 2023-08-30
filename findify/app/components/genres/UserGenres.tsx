import getUserGenres from '@/app/actions/user/getUserGenres';
import { Session } from 'next-auth';
import SingleGenre from './SingleGenre';
import EmptyGenreState from './EmptyGenreState';

interface UserGenresProps {
  session: Session | null;
}

const UserGenres: React.FC<UserGenresProps> = async ({ session }) => {
  if (!session) {
    return <EmptyGenreState home={true} />;
  }

  const userGenres = await getUserGenres();

  if (!userGenres) {
    return <EmptyGenreState />;
  }
  const sortedGenres = () => {
    const genreArray: { genre: string; genreCount: number }[] = [];
    userGenres.forEach((genreCount, genre) => {
      genreArray.push({ genre: genre, genreCount: genreCount });
    });
    const sortedGenres = genreArray.sort((objOne, objTwo) => {
      if (objOne.genreCount < objTwo.genreCount) {
        return 1;
      } else if (objOne.genreCount > objTwo.genreCount) {
        return -1;
      } else {
        return 0;
      }
    });
    return genreArray;
  };

  return (
    <>
      <h3 className="text-white text-xl font-semibold mb-2 px-2 pt-4">
        Your Top Genres
      </h3>
      <ul
        className="flex gap-2 overflow-x-auto py-1 mx-2 pb-4
      "
        id="user-genres"
      >
        {sortedGenres().map((genre) => {
          return <SingleGenre label={genre.genre} key={genre.genre} />;
        })}
      </ul>
    </>
  );
};

export default UserGenres;
