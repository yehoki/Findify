'use client';

import { AudioFeaturesObject, TrackObject } from '@/app/types/SpotifyTypes';
import SingleRandomTrack from './SingleRandomTrack';
import { Dispatch, SetStateAction } from 'react';

interface RandomTracksProps {
  tracks: {
    trackInfo: TrackObject | undefined;
    trackAnalysis: AudioFeaturesObject;
  }[];
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}

const RandomTracks: React.FC<RandomTracksProps> = ({
  tracks,
  selected,
  setSelected,
}) => {
  return (
    <ul className="w-full group">
      {tracks.map(
        (track) =>
          track.trackInfo && (
            <SingleRandomTrack
              selected={selected}
              setSelected={setSelected}
              key={track.trackInfo.id}
              trackAnalysis={track.trackAnalysis}
              trackInfo={track.trackInfo}
            />
          )
      )}
    </ul>
  );
};

export default RandomTracks;
