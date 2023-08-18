'use client';

import Image from 'next/image';

interface DisplaySingleTrackProps {
  name: string;
  artists: string[];
  imageUrl: string;
}

const DisplaySingleTrack: React.FC<DisplaySingleTrackProps> = ({
  name,
  artists,
  imageUrl,
}) => {
  return (
    <div>
      <div className="relative w-[100px] h-[100px]">
        <Image src={imageUrl} alt={`${name} track cover`} fill />{' '}
      </div>
    </div>
  );
};

export default DisplaySingleTrack;
