import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import {
  ArtistObject,
  SearchReturnObject,
  SimplifiedAlbumObject,
  SimplifiedArtistObject,
  TrackObject,
} from '../types/SpotifyTypes';
import { FullSearchResults } from '@/app/components/search/Search';

type InitialState = {
  isEmpty: boolean;
  isSearching: boolean;
  searchResults: {
    albums: SearchReturnObject<SimplifiedAlbumObject>;
    artists: SearchReturnObject<ArtistObject>;
    tracks: SearchReturnObject<TrackObject>;
  };
};

const initialState = {
  isEmpty: true,
  isSearching: false,
  searchResults: {
    albums: {
      href: '',
      limit: 0,
      next: null,
      offset: 0,
      previous: null,
      total: 0,
      items: [],
    },
    artists: {
      href: '',
      limit: 0,
      next: null,
      offset: 0,
      previous: null,
      total: 0,
      items: [],
    },
    tracks: {
      href: '',
      limit: 0,
      next: null,
      offset: 0,
      previous: null,
      total: 0,
      items: [],
    },
  },
} as InitialState;

const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    setSearching: (state) => {
      return {
        isSearching: true,
        searchResults: state.searchResults,
        isEmpty: false,
      };
    },
    setFinishSearching: (state) => {
      return {
        ...state, isSearching: false
      };
    },
    setSearchResults: (state, action: PayloadAction<FullSearchResults>) => {
      return {
        isSearching: false,
        searchResults: action.payload,
        isEmpty: false,
      };
    },
  },
});

export const { setSearching, setSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
