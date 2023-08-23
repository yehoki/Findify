'use client';

import SingleEmptyGenre from './SingleEmptyGenre';

interface EmptyGenreStateProps {}

const EmptyGenreState: React.FC<EmptyGenreStateProps> = ({}) => {
  const genres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  return (
    <div>
      <div className="h-8 p-2 mb-4"></div>
      <ul className="flex gap-2 overflow-x-auto py-1 mx-2">
        {genres.map((genre) => {
          return <SingleEmptyGenre key={genre} />;
        })}
      </ul>
    </div>
  );
};

export default EmptyGenreState;
