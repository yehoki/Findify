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
    // if (popularity < boxCount * 10) {
    //   return popularity - boxCount * 10;
    // } else if (popularity === boxCount * 10){
    //   return 10;
    // } else {
    //   return 10
    // }
  };
  return (
    <div className="h-5 w-5">
      <div
        style={{ width: `${calculateWidth() * 10}%` }}
        className="h-full bg-spotifyGreen"
      ></div>
    </div>
  );
};

export default SingleTrackPopularityBox;
