'use client';

interface SingleTrackPopularityBoxProps {
  popularity: number;
  boxCount: number;
}

const SingleTrackPopularityBox: React.FC<SingleTrackPopularityBoxProps> = ({
  popularity,
  boxCount,
}) => {
  const calculateWidth = () => {
    if (popularity > boxCount * 10) {
      return 10;
    } else if (
      popularity >= (boxCount - 1) * 10 &&
      popularity <= boxCount * 10
    ) {
      return popularity - (boxCount - 1) * 10;
    } else {
      return 0;
    }
  };
  return (
    <div
      className={`h-5 w-5 
    ${boxCount === 10 ? '' : 'border-r-[2px] '} border-[#121212]`}
    >
      <div
        style={{ width: `${calculateWidth() * 10}%` }}
        className={`h-full bg-spotifyGreen
        ${boxCount === 1 ? 'rounded-l-sm' : ''}
        ${boxCount === 10 ? 'rounded-r-sm' : ''}    
        `}
      ></div>
    </div>
  );
};

export default SingleTrackPopularityBox;
