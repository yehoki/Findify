'use client';

import { FormEvent } from 'react';
import RecommendationSlider from './RecommendationSlider';
import { TrackObject } from '@/app/types/SpotifyTypes';
import { Session } from 'next-auth';

interface RecommendationFormProps {
  analysisData: {
    label: string;
    average: number;
    min: number;
    max: number;
    extraInfo?: string;
  }[];
  songInformation: TrackObject[];
  session: Session;
}

const RecommendationForm: React.FC<RecommendationFormProps> = ({
  analysisData,
  session,
}) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const acousticness = formData.get('acousticness');
    const danceability = formData.get('danceability');
    const energy = formData.get('energy');
    const instrumentalness = formData.get('instrumentalness');
    const liveness = formData.get('liveness');
    const loudness = formData.get('loudness');
    const popularity = formData.get('popularity');
    const speechiness = formData.get('speechiness');
    const tempo = formData.get('tempo');
    const valence = formData.get('valence');
  };

  return (
    <form className="w-full lg:w-1/2 2xl:w-5/12" onSubmit={handleSubmit}>
      <ul>
        {analysisData.map((analysisPoint) => (
          <RecommendationSlider
            average={analysisPoint.average}
            label={analysisPoint.label}
            key={analysisPoint.label}
            min={analysisPoint.min}
            max={analysisPoint.max}
            extra={analysisPoint.extraInfo}
          />
        ))}
      </ul>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RecommendationForm;
