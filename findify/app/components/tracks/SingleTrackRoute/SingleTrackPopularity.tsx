'use client';

import SingleTrackPopularityBox from './SingleTrackPopularityBox';

interface SingleTrackPopularityProps {
  popularity: number;
}

const SingleTrackPopularity: React.FC<SingleTrackPopularityProps> = ({
  popularity,
}) => {
  return (
    <div
      className="w-full hidden lg:flex border-[2px] border-[#b3b3b3]
    rounded-md"
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

export default SingleTrackPopularity;
