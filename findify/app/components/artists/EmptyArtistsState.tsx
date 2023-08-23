'use client';

import SingleEmptyUserArtist from './SingleEmptyUserArtist';

interface EmptyArtistsStateProps {}

const EmptyArtistsState: React.FC<EmptyArtistsStateProps> = ({}) => {
  const artists = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div>
      <div className="h-8 p-2 mb-4"></div>
      <div
        className="grid gap-4
    grid-rows-1 grid-flow-col"
      >
        {artists.map((artist) => (
          <SingleEmptyUserArtist key={artist} />
        ))}
      </div>
    </div>
  );
};

export default EmptyArtistsState;
