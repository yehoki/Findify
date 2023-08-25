'use client';

import { ArtistObject } from '@/app/types/SpotifyTypes';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineUser } from 'react-icons/ai';

interface SingleUserArtistProps {
  artist: ArtistObject;
  index: number;
  isIndex?: boolean;
}

const SingleUserArtist: React.FC<SingleUserArtistProps> = ({
  artist,
  index,
  isIndex,
}) => {
  return (
    <div
      className="rounded-md p-4 bg-[#181818] 
    hover:bg-[#252525] transition duration-300 cursor-pointer
    max-w-[132px] md:max-w-fit
    "
    >
      <Link href={`/artist/${artist.id}`}>
        <div
          className="relative h-[100px] w-[100px] md:w-[150px] md:h-[150px] mb-4 
      rounded-full shadow-lg shadow-[#181818] "
        >
          {artist.images && artist.images[0] && (
            <Image
              src={`${artist.images[0].url}`}
              fill
              alt={`${artist.name} artist image`}
              className="rounded-full "
            />
          )}
          {(!artist.images || !artist.images[0]) && (
            <div className="w-full h-full flex justify-center items-center bg-[#333] text-spotifyOffWhite rounded-full">
              <AiOutlineUser size={50} />
            </div>
          )}
        </div>
        <div>
          <div
            className="text-white font-semibold overflow-clip text-ellipsis
         md:line-clamp-2"
          >
            {isIndex ? index + 1 + '. ' : ''} {artist.name}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SingleUserArtist;
