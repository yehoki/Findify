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
      if (!playlistTracks) {
        return;
      }
      exportPlaylist(playlistTracks);
    },
    [session]
  );

  const handleImport = useCallback(async () => {
    const fileInput = document.getElementById(
      'playlist-import'
    ) as HTMLInputElement;
    if (fileInput.files === null) {
      return;
    }
    const file = fileInput.files[0];
    const fileText = await file.text();
    const newArr = fileText.split('\n').map((row) => row.split(','));
  }, []);
  return (
    <>
      {/* <div>
        <input
          className="text-spotifyGreen border-spotifyGreen background-transparent"
          type="file"
          name="playlist-import"
          id="playlist-import"
          accept=".csv"
          onInput={(e) => handleImport()}
        />
      </div> */}
      <div
        className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 
                            gap-4 md:gap-2 lg:gap-4">
        {myPlaylists.items.map((playlist) => (
          <SinglePlaylist
            key={playlist.id}
            name={playlist.name}
            id={playlist.id}
            externalSpotifyUrl={playlist.external_urls.spotify}
            imageUrl={playlist.images[0].url}
            handleExport={handleExport}
          />
        ))}
      </div>
    </>
  );
};

export default MyTrackPlaylists;
