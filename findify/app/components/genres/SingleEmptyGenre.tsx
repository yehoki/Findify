'use client';

interface SingleEmptyGenreProps {}

const SingleEmptyGenre: React.FC<SingleEmptyGenreProps> = ({}) => {
  return (
    <li
      className="min-w-fit px-4 py-2
    bg-[#181818] text-white
    rounded-full
    hover:bg-[#252525] transition duration-300 cursor-pointer
    animate-pulse
    "
    >
      <div
        style={{ width: `${Math.floor(Math.random() * 50) + 70}px` }}
        className={`h-6 bg-white/20 rounded-full`}
      ></div>
    </li>
  );
};

export default SingleEmptyGenre;
