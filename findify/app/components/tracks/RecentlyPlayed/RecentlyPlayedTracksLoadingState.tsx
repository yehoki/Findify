'use client';

interface RecentlyPlayedTracksLoadingStateProps {
  loading: 'loading' | 'noMoreResults' | 'notLoading';
}

const RecentlyPlayedTracksLoadingState: React.FC<
  RecentlyPlayedTracksLoadingStateProps
> = ({ loading }) => {
  return (
    <>
      {loading === 'loading' && (
        <div
          className="py-2 px-4 mb-2 w-full rounded-md 
    bg-[#191919] hover:bg-spotifyGray
    transition   
    flex gap-4
    animate-pulse
    "
        >
          <div className="min-w-[50px] h-[50px] aspect-square bg-spotifyLighterGray"></div>
          <div className="w-full">
            <div className="bg-white/20 h-[18px] w-1/4 rounded-full mb-2"></div>
            <div className="bg-spotifyOffWhite/20 h-[14px] w-1/6 rounded-full"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecentlyPlayedTracksLoadingState;
