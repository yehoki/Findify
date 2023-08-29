'use client';

import { parseArtists } from '@/app/config/helper';
import { TrackObject } from '@/app/types/SpotifyTypes';
import Image from 'next/image';
import Link from 'next/link';
import RecommendationLoadingState from './RecommendationLoadingState';
import { Session } from 'next-auth';
import createNewPlaylist from '@/app/actions/playlists/createNewPlaylist';
import { useSliderRecommendationSelector } from '@/app/store/store';
import addSongsToPlaylist from '@/app/actions/playlists/addSongsToPlaylist';
import { useCallback, useState } from 'react';

interface RecommendationDisplayProps {
  tracks: TrackObject[];
  recommendationState: 'none' | 'fetching' | 'display';
  session: Session;
}

const RecommendationDisplay: React.FC<RecommendationDisplayProps> = ({
  tracks,
  recommendationState,
  session,
}) => {
  const currentTrack = useSliderRecommendationSelector(
    (state) => state.sliderRecommendationReducer.currentTrack
  );
  const [newPlaylistId, setNewPlaylistId] = useState('');
  const [isPlaylistLoading, setIsPlaylistLoading] = useState(false);

  const handleCreatePlaylist = useCallback(async () => {
    setIsPlaylistLoading(true);
    const convertTracksToIds = tracks.map(
      (track) => `spotify:track:${track.id}`
    );
    const newPlaylist = await createNewPlaylist(
      session,
      `Spotify songs similar to ${currentTrack}`,
      `Spotify recommended tracks similar to ${currentTrack}. For you — By you.`
    );
    if (!newPlaylist) {
      setIsPlaylistLoading(false);
      return;
    }

    const addTracksToPlaylist = await addSongsToPlaylist(
      session,
      newPlaylist,
      convertTracksToIds
    );
    if (!addTracksToPlaylist) {
      setIsPlaylistLoading(false);
      return;
    }

    setNewPlaylistId(newPlaylist);
    setIsPlaylistLoading(false);
  }, [currentTrack, session, tracks]);

  if (recommendationState === 'none') {
    return <></>;
  }
  return (
    <>
      {recommendationState === 'fetching' ? (
        <RecommendationLoadingState />
      ) : (
        <>
          <h3 className="px-4 text-xl text-white font-semibold mb-4">
            Here are some songs we think you&apos;d like
          </h3>
          <ul
            className="grid grid-cols-1 lg:grid-cols-2
                          gap-2 lg:gap-y-4 px-4"
          >
            {tracks.map((track, index) => (
              <li
                // Fixes duplicate key problem
                key={`${track.id}${index}`}
                className="flex gap-4 p-2 
                bg-[#131313] hover:bg-[#252525] transition
                rounded-md"
              >
                <Link href={`/track/${track.id}`}>
                  <div
                    className="relative w-[100px] h-[100px] aspect-square
                                md:w-[150px] md:h-[150px]"
                  >
                    <Image
                      src={track.album.images[0].url}
                      alt={`${track.album.name} album cover`}
                      fill
                    />
                  </div>
                </Link>
                <div>
                  <h4
                    className="line-clamp-2 
                  text-lg font-semibold text-white"
                  >
                    <Link
                      className="hover:underline"
                      href={`/track/${track.id}`}
                    >
                      {track.name}
                    </Link>
                  </h4>
                  <h5
                    className="line-clamp-2 
                  text-sm text-spotifyOffWhite font-semibold"
                  >
                    {parseArtists(track.artists.map((artist) => artist.name))}
                  </h5>
                </div>
              </li>
            ))}
          </ul>
          <section className="mt-4">
            <h3 className="px-4 text-xl text-white font-semibold">
              Create a playlist from recommended songs
            </h3>
            <h4 className="px-4 text-spotifyOffWhite mb-2">
              {tracks[0].name}, {tracks[1].name} and {tracks.length - 2} more
            </h4>
            <button
              className="mx-4 px-2 py-1 text-spotifyGreen rounded-md border-spotifyGreen border"
              onClick={handleCreatePlaylist}
            >
              Create Playlist
            </button>
            {newPlaylistId !== '' && (
              <>
                <a href={`https://open.spotify.com/playlist/${newPlaylistId}`}>
                  Checkout your new playlist on Spotify
                </a>
              </>
            )}
          </section>
        </>
      )}
    </>
  );
};

export default RecommendationDisplay;
