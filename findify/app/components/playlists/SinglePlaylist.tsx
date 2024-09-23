'use client';

import Image from 'next/image';
import React from 'react';

interface SinglePlaylistProps {
  name: string;
  imageUrl: string;
  externalSpotifyUrl: string;
}

const SinglePlaylist: React.FC<SinglePlaylistProps> = ({
  name,
  imageUrl,
  externalSpotifyUrl,
}) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <div className="relative h-[50px] w-[50px] md:w-[75px] md:h-[75px] mb-4 rounded-md shadow-lg z-0">
        <Image src={imageUrl} alt={`${name} image`} fill />
      </div>
      <div>
        <a href={externalSpotifyUrl} target="_blank">
          {name}
        </a>
      </div>
      <button
        className="w-fit py-2 px-4 
   text-spotifyGreen 
  border-spotifyGreen border rounded-md hover:scale-105 transition"
      >
        Export Playlist
      </button>
    </div>
  );
};

export default SinglePlaylist;