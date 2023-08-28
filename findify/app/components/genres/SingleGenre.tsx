'use client';

import Link from 'next/link';

interface SingleGenreProps {
  label: string;
}

const SingleGenre: React.FC<SingleGenreProps> = ({ label }) => {
  return (
    <li
      className="min-w-fit px-4 py-2
    bg-[#181818] text-white
    rounded-full
    hover:bg-[#252525] transition duration-300 cursor-pointer
    "
    >
      <Link href={`/genre/${label.toLowerCase()}`}>{label}</Link>
    </li>
  );
};

export default SingleGenre;
