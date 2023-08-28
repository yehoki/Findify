import { Slider } from '@mui/material';
import RecommendationSlider from '../components/tracks/Recommendations/RecommendationSlider';

const RecommendationsPage = ({}) => {
  const analysisPoints = [
    'acousticness',
    'danceability',
    'duration',
    'energy',
    'instrumentalness',
    'key',
    'liveness',
    'loudness',
    'popularity',
    'speechiness',
    'tempo',
    'timeSignature',
    'valence',
  ];
  return (
    <div>
      Recommendations
      <ul>
        {analysisPoints.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <RecommendationSlider />
    </div>
  );
};

export default RecommendationsPage;
