'use client';

import SingleEmptyUserTrack from './SingleEmptyUserTrack';

interface EmptyTracksStateProps {}

const EmptyTracksState: React.FC<EmptyTracksStateProps> = ({}) => {
  const tracks = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div>
      <div className="h-8 p-2 mb-4"></div>
      <div className="grid gap-4 grid-rows-1 grid-flow-col">
        {tracks.map((track) => (
          <SingleEmptyUserTrack key={track} />
        ))}
      </div>
    </div>
  );
};

export default EmptyTracksState;
