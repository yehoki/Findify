'use client';

import { ArtistObject } from '@/app/types/SpotifyTypes';
import Image from 'next/image';

interface SingleUserArtistProps {
  artist: ArtistObject;
  index: any;
}

const SingleUserArtist: React.FC<SingleUserArtistProps> = ({
  artist,
  index,
}) => {
  return (
    <div
      className="rounded-md p-4 bg-[#181818] 
    hover:bg-[#252525] transition duration-300 cursor-pointer
    max-w-[132px] md:max-w-fit
    "
    >
      <div
        className="relative h-[100px] w-[100px] md:w-[150px] md:h-[150px] mb-4 
      rounded-full shadow-lg shadow-[#181818]"
      >
        <Image
          src={`${artist.images[0].url}`}
          fill
          alt={`${artist.name} artist image`}
          className="rounded-full "
        />
      </div>
      <div>
        <div
          className="text-white font-semibold overflow-clip text-ellipsis
         md:line-clamp-2"
        >
          {index + 1}. {artist.name}
        </div>
      </div>
    </div>
  );
};

export default SingleUserArtist;
