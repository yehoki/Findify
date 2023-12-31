'use client';

import { parseArtists } from '@/app/config/helper';
import {
  clearValues,
  setValues,
} from '@/app/reducers/sliderRecommendationReducer';
import { AudioFeaturesObject, TrackObject } from '@/app/types/SpotifyTypes';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';

interface SingleRandomTrackProps {
  trackAnalysis: AudioFeaturesObject;
  trackInfo: TrackObject;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}

const SingleRandomTrack: React.FC<SingleRandomTrackProps> = ({
  trackAnalysis,
  trackInfo,
  selected,
  setSelected,
}) => {
  const dispatch = useDispatch();
  const handleClickTrack = () => {
    if (selected === trackInfo.id) {
      setSelected('');
      dispatch(clearValues());
    } else {
      setSelected(trackInfo.id);
      dispatch(
        setValues({
          analysis: {
            acousticness: trackAnalysis.acousticness,
            danceability: trackAnalysis.danceability,
            energy: trackAnalysis.energy,
            instrumentalness: trackAnalysis.instrumentalness,
            liveness: trackAnalysis.liveness,
            loudness: trackAnalysis.loudness,
            popularity: trackInfo.popularity,
            speechiness: trackAnalysis.speechiness,
            tempo: trackAnalysis.tempo,
            valence: trackAnalysis.valence,
          },
          currentTrackName: trackInfo.name,
        })
      );
    }
  };
  return (
    <li
      className={`mb-2 px-2 py-2 hover:bg-[#252525]
                  hover:opacity-100
                  transition duration-300
                  rounded-md w-full
                  focus-within:bg-[#252525]
                  cursor-pointer
          ${
            selected === trackInfo.id
              ? 'opacity-100 bg-[#252525]'
              : 'opacity-75 bg-[#181818]'
          }
                  `}
      onClick={handleClickTrack}
    >
      <div className="flex gap-4">
        <Link href={`/track/${trackInfo.id}`} className="outline-none">
          <div className="relative w-[100px] h-[100px]">
            <Image
              src={trackInfo.album.images[0].url}
              alt={`${trackInfo.name} album cover`}
              fill
            />
          </div>
        </Link>
        <div className="font-semibold">
          <h5 className="text-white line-clamp-2">
            <Link
              href={`/track/${trackInfo.id}`}
              className="outline-none hover:underline"
            >
              {trackInfo.name}
            </Link>
          </h5>
          <p className="text-spotifyOffWhite text-sm line-clamp-1 mb-2">
            by {parseArtists(trackInfo.artists.map((artist) => artist.name))}
          </p>
        </div>
      </div>
    </li>
  );
};

export default SingleRandomTrack;
