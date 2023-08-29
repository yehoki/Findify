'use client';

interface RecommendationLoadingStateProps {}

const RecommendationLoadingState: React.FC<
  RecommendationLoadingStateProps
> = ({}) => {
  return (
    <>
      <div className="h-7 w-full mb-4"></div>
      <div
        className="grid grid-cols-1 lg:grid-cols-2
    gap-2 lg:gap-y-4 px-4 animate-pulse"
      >
        <div className="flex gap-4 p-2 bg-[#131313] rounded-md">
          <div
            className="w-[100px] h-[100px] aspect-square
                                md:w-[150px] md:h-[150px] bg-spotifyGray"
          ></div>
          <div className="w-full">
            <div className="h-[18px] w-2/3 rounded-full mb-2 bg-white/20"></div>
            <div className="h-[14px] w-5/12 rounded-full bg-spotifyOffWhite/20"></div>
          </div>
        </div>
        <div className="flex gap-4 p-2 bg-[#131313] rounded-md">
          <div
            className="w-[100px] h-[100px] aspect-square
                                md:w-[150px] md:h-[150px] bg-spotifyGray"
          ></div>
          <div className="w-full">
            <div className="h-[18px] w-2/3 rounded-full mb-2 bg-white/20"></div>
            <div className="h-[14px] w-5/12 rounded-full bg-spotifyOffWhite/20"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecommendationLoadingState;
