'use client';

import SingleTrackPopularityBox from '../../tracks/SingleTrackRoute/SingleTrackPopularityBox';

interface SingleArtistPopularityProps {
  popularity: number;
}

const SingleArtistPopularity: React.FC<SingleArtistPopularityProps> = ({
  popularity,
}) => {
  return (
    <div
      className="max-w-[100px] flex border-[2px] 
    border-[#b3b3b3] rounded-md"
    >
      <SingleTrackPopularityBox boxCount={1} popularity={popularity} />
      <SingleTrackPopularityBox boxCount={2} popularity={popularity} />
      <SingleTrackPopularityBox boxCount={3} popularity={popularity} />
      <SingleTrackPopularityBox boxCount={4} popularity={popularity} />
      <SingleTrackPopularityBox boxCount={5} popularity={popularity} />
      <SingleTrackPopularityBox boxCount={6} popularity={popularity} />
      <SingleTrackPopularityBox boxCount={7} popularity={popularity} />
      <SingleTrackPopularityBox boxCount={8} popularity={popularity} />
      <SingleTrackPopularityBox boxCount={9} popularity={popularity} />
      <SingleTrackPopularityBox boxCount={10} popularity={popularity} />
    </div>
  );
};

export default SingleArtistPopularity;
