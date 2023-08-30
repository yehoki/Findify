'use client';

interface SingleEmptyUserArtistProps {
  home?: boolean;
}

const SingleEmptyUserArtist: React.FC<SingleEmptyUserArtistProps> = ({
  home,
}) => {
  return (
    <div
      className={`rounded-md p-4 bg-[#181818] 
  hover:bg-[#252525] transition duration-300 cursor-pointer
  ${home ? '' : 'animate-pulse'}
  `}
    >
      <div
        className="relative w-[100px] h-[100px] md:w-[150px] md:h-[150px] mb-4 bg-[#4a4a4c]
    rounded-full shadow-lg shadow-[#181818]"
      ></div>
      <div>
        <div
          className="text-white font-semibold line-clamp-2 
          h-2 md:h-4 w-full
        bg-white/20 rounded-full
        "
        ></div>
      </div>
    </div>
  );
};

export default SingleEmptyUserArtist;
