'use client';

import { parseArtists } from '@/app/config/helper';
import { TrackObject } from '@/app/types/SpotifyTypes';
import Image from 'next/image';

interface SingleUserTrackProps {
  track: TrackObject;
  index: number;
  isIndex?: boolean;
}

const SingleUserTrack: React.FC<SingleUserTrackProps> = ({
  track,
  index,
  isIndex,
}) => {
  return (
    <div
      className="rounded-md p-4 bg-[#181818] 
    hover:bg-[#252525] transition duration-300 cursor-pointer"
    >
      <div className="relative h-[100px] w-[100px] md:w-[150px] md:h-[150px] mb-4 rounded-md shadow-lg z-0">
        <Image
          src={`${track.album.images[0].url}`}
          fill
          alt={`${track.name} album cover`}
          className="rounded-md"
        />
      </div>
      <div>
        <div className="text-white font-semibold line-clamp-2">
          {isIndex ? index + 1 + '. ' : ''}
          {track.name}
        </div>
        <div className="text-[#a7a7a7] line-clamp-2">
          {parseArtists(track.artists.map((artist) => artist.name))}
        </div>
      </div>
    </div>
  );
};

export default SingleUserTrack;
