'use client';

import SingleArtistTopTrackEmpty from './SingleArtistTopTrackEmpty';

interface ArtistTopTracksEmptyStateProps {}

const ArtistTopTracksEmptyState: React.FC<
  ArtistTopTracksEmptyStateProps
> = ({}) => {
  const tracks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <ul className="pt-4">
      {tracks.map((track) => (
        <SingleArtistTopTrackEmpty key={track} />
      ))}
    </ul>
  );
};

export default ArtistTopTracksEmptyState;
