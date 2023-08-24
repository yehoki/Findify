'use client';

import { useSearchSelector } from '@/app/store/store';
import UserTracks from '../tracks/UserTracks';
import MyTracksCarousel from '../carousels/MyTracksCarousel';
import MyArtistsCarousel from '../carousels/MyArtistsCarousel';

interface DisplayResultsProps {}

const DisplayResults: React.FC<DisplayResultsProps> = ({}) => {
  const searchResults = useSearchSelector(
    (state) => state.searchResultReducer.searchResults
  );
  const isSearching = useSearchSelector(
    (state) => state.searchResultReducer.isSearching
  );
  const isEmpty = useSearchSelector(
    (state) => state.searchResultReducer.isEmpty
  );

  if ((isEmpty && !isSearching) || (isEmpty && isSearching)) {
    return <div>Nothing</div>;
  }
  if (!isEmpty && isSearching) {
    return <div>Empty searching state</div>;
  }

  return (
    <>
      <div className="mb-">
        <ul className="flex gap-2">
          <li>All</li>
          <li>Artists</li>
          <li>Songs</li>
          <li>Albums</li>
        </ul>
      </div>
      {searchResults.tracks.href !== '' && (
        <div>
          {/* <h2>Tracks</h2> */}
          <MyTracksCarousel myTracks={searchResults.tracks.items} />
          {/* {searchResults.tracks.items.map((track) => (
            <div key={track.id}>{track.name}</div>
          ))} */}
        </div>
      )}
      {searchResults.artists.href !== '' && (
        <div>
          {/* <h2>Artists</h2> */}
          <MyArtistsCarousel myArtists={searchResults.artists.items} />
          {/* {searchResults.artists.items.map((artist) => (
            <div key={artist.id}>{artist.name}</div>
          ))} */}
        </div>
      )}
      {searchResults.albums.href !== '' && (
        <div>
          <h2>Albums</h2>
          {searchResults.albums.items.map((album) => (
            <div key={album.id}>{album.name}</div>
          ))}
        </div>
      )}
    </>
  );
};

export default DisplayResults;
