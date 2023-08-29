'use client';

import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { AudioFeaturesObject, TrackObject } from '@/app/types/SpotifyTypes';
import { Session } from 'next-auth';
import RecommendationSliders from './RecommendationSliders';
import RandomTracks from './RandomTracks';
import fetchSelectedRecommendations from '@/app/actions/tracks/fetchSelectedRecommendations';
import SliderRecommendationProvider from '@/app/providers/SliderRecommendationProvider';

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
  recommendationState: 'none' | 'fetching' | 'display';
  setRecommendationState: Dispatch<
    SetStateAction<'none' | 'fetching' | 'display'>
  >;
  setRecommendedTracks: Dispatch<SetStateAction<TrackObject[]>>;
}

const RecommendationForm: React.FC<RecommendationFormProps> = ({
  analysisData,
  session,
  tracksWithAnalysis,
  recommendationState,
  setRecommendationState,
  setRecommendedTracks,
}) => {
  const [selectedTrack, setSelectedTrack] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedTrack === '') {
      return;
    }
    setRecommendationState('fetching');
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
    if (!recommendations) {
      setRecommendationState('none');
      return;
    }
    setRecommendedTracks(recommendations.tracks);
    setRecommendationState('display');
  };

  return (
    <form onSubmit={handleSubmit}>
      <SliderRecommendationProvider>
        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <div
            className="w-full 
            md:w-1/3 lg:w-1/2 2xl:w-5/12
            order-2 md:order-1"
          >
            <RecommendationSliders analysisData={analysisData} />
          </div>
          <div className="block flex-1 order-1 md:order-2 px-4">
            <h4 className="text-xl text-white font-semibold mb-1">
              Here are some songs you are familiar with
            </h4>
            <h5 className="text-sm text-spotifyOffWhite font-semibold mb-4">
              Choose a track from which you want some similar recommendations
            </h5>
            <RandomTracks
              selected={selectedTrack}
              setSelected={setSelectedTrack}
              tracks={tracksWithAnalysis}
            />
          </div>
        </div>
        <div className="flex justify-center mt-4 mb-16">
          <button
            className="w-fit py-2 px-4 text-lg font-semibold text-spotifyGreen
          border-spotifyGreen border rounded-md
          hover:scale-105 transition
        "
            type="submit"
          >
            Submit
          </button>
        </div>
      </SliderRecommendationProvider>
    </form>
  );
};

export default RecommendationForm;
