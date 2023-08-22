'use client';

import Link from 'next/link';
import { IconType } from 'react-icons';

interface MenuItemProps {
  icon: IconType;
  label: string;
  selectedName: 'Home' | 'Search';
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon: Icon,
  label,
  selectedName,
}) => {
  return (
    <li className="py-1 px-3 list">
      <Link
        href=""
        className={`${
          selectedName === label && 'text-white'
        } text-spotifyOffWhite flex gap-5
        hover:text-white transition
        `}
      >
        <Icon size={24} />
        <span>{label}</span>
      </Link>
    </li>
  );
};

export default MenuItem;
