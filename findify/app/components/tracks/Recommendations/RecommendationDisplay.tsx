'use client';

import { parseArtists } from '@/app/config/helper';
import { TrackObject } from '@/app/types/SpotifyTypes';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

interface RecommendationDisplayProps {
  tracks: TrackObject[];
  recommendationState: 'none' | 'fetching' | 'display';
}

const RecommendationDisplay: React.FC<RecommendationDisplayProps> = ({
  tracks,
  recommendationState,
}) => {
  const parseArtistsWithLinks = (artists: { name: string; id: string }[]) => {
    if (artists.length === 0) {
      return;
    }
    const firstArtist = (
      <Link className="hover:underline" href={`/artist/${artists[0].id}`}>
        {artists[0].name}
      </Link>
    );
    if (artists.length === 1) {
      return firstArtist;
    }

    return artists.map((artist, index: number) => (
      <>
        {index !== 0 ? ', ' : ''}
        <Link
          key={artist.id}
          href={`/artist/${artist.id}`}
          className="hover:underline"
        >
          {artist.name}
        </Link>
      </>
    ));
  };

  if (recommendationState === 'none') {
    return <></>;
  }

  return (
    <>
      {recommendationState === 'fetching' ? (
        <>SingleFetchingState</>
      ) : (
        <>
          <h3 className="px-4">Recommendations</h3>
          <ul
            className="grid grid-cols-1 lg:grid-cols-2
                          gap-2 lg:gap-y-4 px-4"
          >
            {tracks.map((track) => (
              <li
                key={track.id}
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
                    {parseArtistsWithLinks(
                      track.artists.map((artist) => ({
                        id: artist.id,
                        name: artist.name,
                      }))
                    )}
                  </h5>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default RecommendationDisplay;
