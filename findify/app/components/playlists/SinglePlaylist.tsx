'use client';

import getPlaylistTracksById from '@/app/actions/playlists/getPlaylistTracksById';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';

interface SinglePlaylistProps {
  name: string;
  id: string;
  imageUrl: string;
  externalSpotifyUrl: string;
  handleExport: (id: string) => Promise<void>;
}

const SinglePlaylist: React.FC<SinglePlaylistProps> = ({
  name,
  id,
  imageUrl,
  externalSpotifyUrl,
  handleExport,
}) => {
  // const [currentId, setCurrentId] = useState('');

  // const onPlaylistExport = useCallback(async () => {
  //   const trackItems = await getPlaylistTracksById(id, session);
  //   console.log(trackItems);
  //   return;
  // }, []);

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
        onClick={() => handleExport(id)}
      >
        Export Playlist
      </button>
    </div>
  );
};

export default SinglePlaylist;
