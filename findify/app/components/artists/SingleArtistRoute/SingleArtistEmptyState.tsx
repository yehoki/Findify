'use client';

import SingleEmptyGenre from '../../genres/SingleEmptyGenre';

interface SingleArtistEmptyStateProps {}

const SingleArtistEmptyState: React.FC<SingleArtistEmptyStateProps> = ({}) => {
  return (
    <>
      <div className="md:flex gap-4 items-center animate-pulse">
        <div
          className="relative min-w-[144px] min-h-[144px]
        w-5/12 h-5/12 rounded-full
        aspect-[1/1]
        max-h-[288px] max-w-[288px]
        mx-auto md:mx-0
        md:mb-4

        "
        >
          <div className="w-full h-full bg-spotifyGray rounded-full"></div>
        </div>
        <div className="hidden md:block">
          <div className="">
            <div className="flex gap-2">
              <h2 className="text-4xl lg:text-5xl font-semibold text-white mb-2">
                <div className="h-9 lg:h-12 w-[300px] bg-spotifyLighterGray rounded-full"></div>
              </h2>
            </div>
            <div className="ml-1 h-[14px] md:h-4 w-[150px] rounded-full bg-spotifyGray"></div>
          </div>
        </div>
      </div>
      <div className="md:hidden mb-8 animate-pulse">
        <div className="w-1/3 h-8 rounded-full bg-spotifyLighterGray mb-2 px-4"></div>
        <div className="h-[14px] w-1/6 rounded-full bg-spotifyGray px-4"></div>
      </div>
      <div>
        <ul className="flex gap-2 py-7 mx-2">
          {[1, 2, 3].map((genre) => {
            return <SingleEmptyGenre key={genre} />;
          })}
        </ul>
      </div>
    </>
  );
};

export default SingleArtistEmptyState;
