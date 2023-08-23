'use client';

import { useState } from 'react';
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai';
import MenuItem from './MenuItem';

interface MenuProps {}

const Menu: React.FC<MenuProps> = ({}) => {
  const [selected, setSelected] = useState<'' | 'Search'>('');

  return (
    <>
      <ul className="py-2 px-3 h-full hidden md:flex flex-col justify-center items-start gap-2">
        <MenuItem label="" icon={AiFillHome} selectedName={selected} />
        <MenuItem
          label="Search"
          icon={AiOutlineSearch}
          selectedName={selected}
        />
      </ul>

      {/* <div
        className="text-[#b3b3b3] hover:text-white transition 
          flex gap-2 items-center"
      >
        <AiFillHome size={24} />
        <span>Home</span>
      </div>
      <div
        className="text-[#b3b3b3] hover:text-white transition 
          flex gap-2 items-center"
      >
        <AiOutlineSearch size={24} />
        <span>Search</span>
      </div> */}
    </>
  );
};

export default Menu;
