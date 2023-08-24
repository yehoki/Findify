'use client';

import SingleTrackPopularityBox from './SingleTrackPopularityBox';

interface SingleTrackPopularityProps {
  popularity: number;
}

const SingleTrackPopularity: React.FC<SingleTrackPopularityProps> = ({
  popularity,
}) => {
  return (
    <div className="w-full">
      <SingleTrackPopularityBox popularity={popularity} />
      <SingleTrackPopularityBox popularity={popularity} />
      <SingleTrackPopularityBox popularity={popularity} />
      <SingleTrackPopularityBox popularity={popularity} />
      <SingleTrackPopularityBox popularity={popularity} />
      <SingleTrackPopularityBox popularity={popularity} />
      <SingleTrackPopularityBox popularity={popularity} />
      <SingleTrackPopularityBox popularity={popularity} />
      <SingleTrackPopularityBox popularity={popularity} />
      <SingleTrackPopularityBox popularity={popularity} />
      <SingleTrackPopularityBox popularity={popularity} />
    </div>
  );
};

export default SingleTrackPopularity;
