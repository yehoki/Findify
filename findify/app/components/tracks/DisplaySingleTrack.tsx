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
      <div className="relative w-[125px] h-[125px]">
        <Image src={imageUrl} alt={`${name} track cover`} fill />{' '}
      </div>
      <h4 className="font-semibold text-sm overflow-hidden line-clamp-2">
        {name}
      </h4>
    </div>
  );
};

export default DisplaySingleTrack;
