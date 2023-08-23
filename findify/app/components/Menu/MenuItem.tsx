'use client';

import Link from 'next/link';
import { IconType } from 'react-icons';
import { usePathname } from 'next/navigation';

interface MenuItemProps {
  icon: IconType;
  label: '' | 'Search';
  selectedName: '' | 'Search';
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon: Icon,
  label,
  selectedName,
}) => {
  const path = usePathname().replace('/', '');

  return (
    <li className="py-1 px-3 ">
      <Link
        href={`/${label !== '' ? label.toLowerCase() : ''}`}
        className={`${
          path === label.toLowerCase() && 'text-white'
        } text-spotifyOffWhite flex items-center gap-5
        hover:text-white transition duration-300
        `}
      >
        <Icon size={32} />
        <span className="font-semibold">{label === '' ? 'Home' : label}</span>
      </Link>
    </li>
  );
};

export default MenuItem;
