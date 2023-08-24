'use client';
import {
  setSearchResults,
  setSearching,
} from '@/app/reducers/searchResultReducer';
import { AppDispatch } from '@/app/store/store';
import {
  ArtistObject,
  SearchReturnObject,
  SimplifiedAlbumObject,
  TrackObject,
} from '@/app/types/SpotifyTypes';
import { Session } from 'next-auth';
import { FormEvent, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
interface SearchProps {
  session: Session | null;
}

export interface FullSearchResults {
  albums: SearchReturnObject<SimplifiedAlbumObject>;
  artists: SearchReturnObject<ArtistObject>;
  tracks: SearchReturnObject<TrackObject>;
}

const Search: React.FC<SearchProps> = ({ session }) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSearching());
    if (!session) {
      return console.log('Please log in');
    }
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search-query')?.toString();
    if (query === '') {
      return console.log('Need some search parameters');
    }
    const spotifyBaseURL = 'https://api.spotify.com/v1/search';
    const res = await fetch(
      `${spotifyBaseURL}?q=${query}&type=album,track,artist`,
      {
        headers: {
          Authorization: `Bearer ${
            session.user.accessToken ? session.user.accessToken : ''
          }`,
        },
        method: 'GET',
      }
    );
    const searchData: FullSearchResults = await res.json();
    dispatch(setSearchResults(searchData));
    console.log(searchData);
  };
  return (
    <div
      className="w-fit group bg-[#252525] rounded-full p-2
    outline outline-1 outline-transparent
    hover:outline-[#b3b3b3] hover:bg-spotifyGray
    focus-within:outline-2 focus-within:outline-white
    "
    >
      <form
        onSubmit={handleSearchSubmit}
        className="flex w-fit gap-2 items-center
      text-spotifyOffWhite group-hover:text-white
      focus-within:text-white 
      "
      >
        <AiOutlineSearch size={24} />
        <input
          autoComplete="off"
          name="search-query"
          type="text"
          className="bg-transparent outline-none
      font-light text-base
      decoration
        "
          placeholder="Search"
        />
      </form>
    </div>
  );
};

export default Search;
