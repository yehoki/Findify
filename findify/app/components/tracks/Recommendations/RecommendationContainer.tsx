'use client';

import { AudioFeaturesObject, TrackObject } from '@/app/types/SpotifyTypes';
import { Session } from 'next-auth';
import RecommendationForm from './RecommendationForm';
import { useState } from 'react';
import RecommendationDisplay from './RecommendationDisplay';

interface RecommendationContainerProps {
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

const RecommendationContainer: React.FC<RecommendationContainerProps> = ({
  analysisData,
  session,
  tracksWithAnalysis,
}) => {
  const [recommendationState, setRecommendationState] = useState<
    'none' | 'fetching' | 'display'
  >('none');
  const [recommendedTracks, setRecommendedTracks] = useState<TrackObject[]>([]);
  return (
    <>
      <RecommendationForm
        analysisData={analysisData}
        session={session}
        tracksWithAnalysis={tracksWithAnalysis}
        recommendationState={recommendationState}
        setRecommendationState={setRecommendationState}
        setRecommendedTracks={setRecommendedTracks}
      />
      <RecommendationDisplay
        tracks={recommendedTracks}
        recommendationState={recommendationState}
      />
    </>
  );
};

export default RecommendationContainer;
