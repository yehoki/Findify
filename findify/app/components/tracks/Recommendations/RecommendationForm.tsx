'use client';

import { FormEvent, useState } from 'react';
import { AudioFeaturesObject, TrackObject } from '@/app/types/SpotifyTypes';
import { Session } from 'next-auth';
import RecommendationSliders from './RecommendationSliders';
import RandomTracks from './RandomTracks';
import fetchSelectedRecommendations from '@/app/actions/tracks/fetchSelectedRecommendations';

interface RecommendationFormProps {
  analysisData: {
    label: string;
    average: number;
    min: number;
    max: number;
    extraInfo?: string;
  }[];
  session: Session;
  tracksWithAnalysis: {
    trackInfo: TrackObject | undefined;
    trackAnalysis: AudioFeaturesObject;
  }[];
}

const fetchRecommendation = () => {};

const RecommendationForm: React.FC<RecommendationFormProps> = ({
  analysisData,
  session,
  tracksWithAnalysis,
}) => {
  const [selectedTrack, setSelectedTrack] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedTrack === '') {
      return;
    }
    const formData = new FormData(e.currentTarget);

    const acousticness = formData.get('acousticness') as string;
    const danceability = formData.get('danceability') as string;
    const energy = formData.get('energy') as string;
    const instrumentalness = formData.get('instrumentalness') as string;
    const liveness = formData.get('liveness') as string;
    const loudness = formData.get('loudness') as string;
    const popularity = formData.get('popularity') as string;
    const speechiness = formData.get('speechiness') as string;
    const tempo = formData.get('tempo') as string;
    const valence = formData.get('valence') as string;

    const recommendations = await fetchSelectedRecommendations(
      50,
      session,
      selectedTrack,
      parseFloat(acousticness),
      parseFloat(danceability),
      parseFloat(energy),
      parseFloat(instrumentalness),
      parseFloat(liveness),
      parseFloat(loudness),
      parseFloat(popularity),
      parseFloat(speechiness),
      parseFloat(tempo),
      parseFloat(valence)
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-4 mt-8"
    >
      <div
        className="w-full 
            md:w-1/3 lg:w-1/2 2xl:w-5/12
            order-2 md:order-1"
      >
        <RecommendationSliders analysisData={analysisData} />
      </div>
      <div className="block flex-1 order-1 md:order-2 px-4">
        <h4 className="text-xl text-white font-semibold mb-1">
          Some songs you are familiar with
        </h4>
        <h5 className="text-sm text-spotifyOffWhite font-semibold mb-4">
          Choose a track for which you want some similar recommendations
        </h5>
        <RandomTracks
          selected={selectedTrack}
          setSelected={setSelectedTrack}
          tracks={tracksWithAnalysis}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RecommendationForm;
