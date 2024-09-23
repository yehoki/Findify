'use client';

import { MyPlaylists } from '@/app/types/SpotifyTypes';
import { Session } from 'next-auth';
import SinglePlaylist from './SinglePlaylist';
import { useCallback } from 'react';
import getPlaylistTracksById from '@/app/actions/playlists/getPlaylistTracksById';
import { exportPlaylist } from '@/app/config/helper';

interface MyPlaylistsProps {
  session: Session;
  myPlaylists: MyPlaylists;
}

const MyTrackPlaylists: React.FC<MyPlaylistsProps> = ({
  session,
  myPlaylists,
}) => {
  const handleExport = useCallback(
    async (id: string) => {
      const playlistTracks = await getPlaylistTracksById(id, session);
      console.log(playlistTracks);
      if (!playlistTracks) {
        return;
      }
      exportPlaylist(playlistTracks);
    },
    [session]
  );
  return (
    <>
      {myPlaylists.items.map((playlist) => (
        <SinglePlaylist
          name={playlist.name}
          id={playlist.id}
          externalSpotifyUrl={playlist.external_urls.spotify}
          imageUrl={playlist.images[0].url}
          handleExport={handleExport}
        />
      ))}
    </>
  );
};

export default MyTrackPlaylists;
