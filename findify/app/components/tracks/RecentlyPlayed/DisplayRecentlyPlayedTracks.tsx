'use client';

import { fetchMoreTracks } from '@/app/actions/tracks/fetchMoreRecentlyPlayedTracks';
import { getTimeFromNow, parseArtists } from '@/app/config/helper';
import {
  PlayHistoryObject,
  RecentlyPlayedTracks,
} from '@/app/types/SpotifyTypes';
import { Session } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import RecentlyPlayedTracksLoadingState from './RecentlyPlayedTracksLoadingState';

interface DisplayRecentlyPlayedTracksProps {
  initialTracks: RecentlyPlayedTracks;
  session: Session;
}

const DisplayRecentlyPlayedTracks: React.FC<
  DisplayRecentlyPlayedTracksProps
> = ({ initialTracks, session }) => {
  const [tracks, setTracks] = useState<PlayHistoryObject[]>(
    initialTracks.items
  );
  const [nextBefore, setNextBefore] = useState(initialTracks.cursors.before);
  const [loading, setLoading] = useState<
    'loading' | 'noMoreResults' | 'notLoading'
  >('notLoading');
  const [loadingRef, inView] = useInView();

  const loadMoreTracks = useCallback(async () => {
    if (loading === 'noMoreResults') {
      return;
    }
    setLoading('loading');
    const nextTracks = await fetchMoreTracks(
      10,
      parseInt(nextBefore),
      session.user.accessToken ? session.user.accessToken : ''
    );
    if (!nextTracks || !nextTracks.cursors) {
      setLoading('noMoreResults');
      return;
    }
    setTracks((previousTracks) => [...previousTracks, ...nextTracks.items]);
    setNextBefore(nextTracks.cursors.before);
    setLoading('notLoading');
  }, [nextBefore, session.user.accessToken, loading]);

  useEffect(() => {
    if (inView) {
      loadMoreTracks();
    }
  }, [inView, loadMoreTracks]);

  return (
    <div className="text-white mx-2 py-4">
      <h3 className="text-xl font-semibold mb-4">Recently played tracks</h3>
      <ul>
        {tracks.map((track) => {
          const epochTime = new Date(track.played_at);
          return (
            <li
              key={track.track.id + Math.floor(Math.random() * 10000)}
              className="py-2 mb-2 px-4 
    w-full rounded-md 
    bg-[#191919] hover:bg-spotifyGray
    transition
    "
            >
              <Link href={`/track/${track.track.id}`}>
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <div className="relative min-w-[50px] h-[50px] aspect-[1/1]">
                      <Image
                        src={track.track.album.images[0].url}
                        alt={`${track.track.name} album cover`}
                        fill
                      />
                    </div>
                    <div>
                      <h4
                        className="font-semibold 
            text-lg text-white line-clamp-1 max-w-[175px]"
                      >
                        {track.track.name}
                      </h4>
                      <h5
                        className="font-semibold text-sm text-spotifyOffWhite line-clamp-1
                      max-w-[150px]"
                      >
                        {parseArtists(
                          track.track.artists.map((artist) => artist.name)
                        )}{' '}
                        · {track.track.album.name}
                      </h5>
                    </div>
                  </div>
                  <div>
                    <p
                      className="text-sm text-spotifyOffWhite 
          font-semibold line-clamp-1 max-w-[72px] sm:max-w-[125px]"
                    >
                      <Suspense>{getTimeFromNow(epochTime.getTime())}</Suspense>
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      <div ref={loadingRef}>
        {loading === 'loading' && <RecentlyPlayedTracksLoadingState />}
      </div>
    </div>
  );
};

export default DisplayRecentlyPlayedTracks;
