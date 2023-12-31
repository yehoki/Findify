'use client';

interface SingleEmptyUserTrackProps {
  home?: boolean;
}

const SingleEmptyUserTrack: React.FC<SingleEmptyUserTrackProps> = ({
  home,
}) => {
  return (
    <div
      className={`rounded-md p-4 bg-[#181818] 
  hover:bg-[#252525] transition duration-300 cursor-pointer
  group
    ${home ? '' : 'animate-pulse'}
  `}
    >
      <div className="relative w-[100px] h-[100px] md:w-[150px] md:h-[150px] mb-4 rounded-md shadow-lg z-0 bg-[#4a4a4c]"></div>
      <div>
        <div
          className="h-2 md:h-4 transition duration-300 bg-white/20 group-hover:bg-white 
        w-11/12 line-clamp-2 rounded-full mb-2"
        ></div>
        <div
          className="h-2 md:h-4 transition duration-300 bg-[#a7a7a7]/20 group-hover:bg-[#a7a7a7] 
        w-2/3 line-clamp-2 rounded-full "
        ></div>
      </div>
    </div>
  );
};

export default SingleEmptyUserTrack;
