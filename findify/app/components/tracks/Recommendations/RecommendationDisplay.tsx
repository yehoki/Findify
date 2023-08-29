'use client';

import { TrackObject } from '@/app/types/SpotifyTypes';
import { Dispatch, SetStateAction } from 'react';

interface RecommendationDisplayProps {
  tracks: TrackObject[];
  recommendationState: 'none' | 'fetching' | 'display';
}

const RecommendationDisplay: React.FC<RecommendationDisplayProps> = ({
  tracks,
  recommendationState,
}) => {
  if (recommendationState === 'none') {
    return <></>;
  }

  return (
    <>
      {recommendationState === 'fetching' ? (
        <>SingleFetchingState</>
      ) : (
        <>
          <ul
            className="grid grid-cols-1 xl:grid-cols-2
                          gap-4 xl:gap-x-8 xl:gap-y-4
          "
          >
            {tracks.map((track) => (
              <li key={track.id}>
                {track.name} by {track.artists[0].name}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default RecommendationDisplay;
