'use client';

import EmptyArtistsState from '../artists/EmptyArtistsState';
import EmptyTracksState from '../tracks/EmptyTracksState';

interface LoadingSearchResultsProps {}

const LoadingSearchResults: React.FC<LoadingSearchResultsProps> = ({}) => {
  return (
    <div>
      <div className="mb-8">
        <EmptyTracksState />
      </div>
      <div className="mb-8">
        <EmptyArtistsState />
      </div>
      <div className="mb-8">
        <EmptyTracksState />
      </div>
    </div>
  );
};

export default LoadingSearchResults;
