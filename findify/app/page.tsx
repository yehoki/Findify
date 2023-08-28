export const dynamic = 'force-dynamic';

import getUserSession from './actions/user/getUserSession';
import getUserGenres from './actions/user/getUserGenres';
import HeaderUserProfile from './components/HeaderUserProfile';
import UserTracks from './components/tracks/UserTracks';
import { Suspense } from 'react';
import EmptyTracksState from './components/tracks/EmptyTracksState';
import UserArtists from './components/artists/UserArtists';
import EmptyArtistsState from './components/artists/EmptyArtistsState';
import MobileHeader from './components/header/MobileHeader';
import UserGenres from './components/genres/UserGenres';
import EmptyGenreState from './components/genres/EmptyGenreState';
import getRecentlyPlayedTracks from './actions/tracks/getRecentlyPlayedTracks';
import Image from 'next/image';
import { getTimeFromNow, parseArtists } from './config/helper';
import Link from 'next/link';
export default async function Home() {
  const session = await getUserSession();

  const recentlyPlayedTracks = await getRecentlyPlayedTracks();
  if (!recentlyPlayedTracks) {
    return <></>;
  }

  return (
    <>
      <header
        className="bg-black md:bg-spotifyBlackBase py-4 md:py-0 md:h-16 w-full
          flex justify-between items-center md:block
          relative
          "
      >
        <HeaderUserProfile session={session} />
        <MobileHeader session={session} />
      </header>
      <div className="mt-10 md:mt-0">
        <div className="py-4 overflow-x-hidden">
          <Suspense fallback={<EmptyTracksState />}>
            <UserTracks session={session} />
          </Suspense>
        </div>
        <div className="py-4 overflow-x-hidden ">
          <Suspense fallback={<EmptyArtistsState />}>
            <UserArtists session={session} />
          </Suspense>
        </div>
        <div className="py-4">
          <Suspense fallback={<EmptyGenreState />}>
            <UserGenres session={session} />
          </Suspense>
        </div>
        <div className="text-white mx-2">
          <h3 className="text-xl font-semibold mb-4">Recently played tracks</h3>
          <ul>
            {recentlyPlayedTracks.items.map((track) => {
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
                        text-lg text-white line-clamp-1"
                          >
                            {track.track.name}
                          </h4>
                          <h5 className="font-semibold text-sm text-spotifyOffWhite line-clamp-1">
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
                          {getTimeFromNow(epochTime.getTime())}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
