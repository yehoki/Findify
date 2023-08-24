'use client';

import { parseArtists } from '@/app/config/helper';
import { SimplifiedAlbumObject, TrackObject } from '@/app/types/SpotifyTypes';
import Image from 'next/image';

interface SingleAlbumProps {
  album: SimplifiedAlbumObject;
  index: number;
  isIndex?: boolean;
}

const SingleAlbum: React.FC<SingleAlbumProps> = ({ album, index, isIndex }) => {
  return (
    <div
      className="rounded-md p-4 bg-[#181818] 
    hover:bg-[#252525] transition duration-300 cursor-pointer"
    >
      <div className="relative h-[100px] w-[100px] md:w-[150px] md:h-[150px] mb-4 rounded-md shadow-lg z-0">
        <Image
          src={`${album.images[0].url}`}
          fill
          alt={`${album.name} album cover`}
          className="rounded-md"
        />
      </div>
      <div>
        <div className="text-white font-semibold line-clamp-2">
          {isIndex ? index + 1 + '. ' : ''}
          {album.name}
        </div>
        <div className="text-[#a7a7a7] line-clamp-2 font-light">
          {album.release_date.slice(0, 4)} ·{' '}
          {parseArtists(album.artists.map((artist) => artist.name))}
        </div>
      </div>
    </div>
  );
};

export default SingleAlbum;
