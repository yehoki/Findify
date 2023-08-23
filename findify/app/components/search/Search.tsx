'use client';
import { FormEvent } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
interface SearchProps {}

const Search: React.FC<SearchProps> = ({}) => {
  const handleSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search-query');
    // const res = await fetch(`https://api.spotify.com/v1/search?q=${query}`);
    // const data = await res.json();
    // console.log(data);
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
