import getMultipleTrackAnalysis from '../actions/tracks/getMultipleTrackAnalysis';
import getUserTracks from '../actions/user/getUserTracks';
import RecommendationSlider from '../components/tracks/Recommendations/RecommendationSlider';

const RecommendationsPage = async ({}) => {
  const userTracks = await getUserTracks(50, 'short_term');
  if (!userTracks) {
    return <div></div>;
  }

  const topTrackAnalysis = await getMultipleTrackAnalysis(
    userTracks.items.map((track) => track.id)
  );
  if (!topTrackAnalysis) {
    return <div></div>;
  }

  const averageAcousticness =
    topTrackAnalysis.audio_features.reduce(
      (total, obj) => total + obj.acousticness,
      0
    ) / topTrackAnalysis.audio_features.length;
  const averageDanceability =
    topTrackAnalysis.audio_features.reduce(
      (total, obj) => total + obj.danceability,
      0
    ) / topTrackAnalysis.audio_features.length;
  const averageEnergy =
    topTrackAnalysis.audio_features.reduce(
      (total, obj) => total + obj.energy,
      0
    ) / topTrackAnalysis.audio_features.length;
  const averageInstrumentalness =
    topTrackAnalysis.audio_features.reduce(
      (total, obj) => total + obj.instrumentalness,
      0
    ) / topTrackAnalysis.audio_features.length;
  const averageLiveness =
    topTrackAnalysis.audio_features.reduce(
      (total, obj) => total + obj.liveness,
      0
    ) / topTrackAnalysis.audio_features.length;
  const averageLoudness =
    topTrackAnalysis.audio_features.reduce(
      (total, obj) => total + obj.loudness,
      0
    ) / topTrackAnalysis.audio_features.length;
  const averageSpeechiness =
    topTrackAnalysis.audio_features.reduce(
      (total, obj) => total + obj.speechiness,
      0
    ) / topTrackAnalysis.audio_features.length;
  const averageTempo =
    topTrackAnalysis.audio_features.reduce(
      (total, obj) => total + obj.tempo,
      0
    ) / topTrackAnalysis.audio_features.length;
  const averageValence =
    topTrackAnalysis.audio_features.reduce(
      (total, obj) => total + obj.valence,
      0
    ) / topTrackAnalysis.audio_features.length;

  const averagePopularity =
    userTracks.items.reduce((total, obj) => total + obj.popularity, 0) /
    userTracks.items.length;

  const analysisPoints: {
    label: string;
    average: number;
    min: number;
    max: number;
    extraInfo?: string;
  }[] = [
    { label: 'acousticness', average: averageAcousticness, min: 0, max: 1 },
    { label: 'danceability', average: averageDanceability, min: 0, max: 1 },
    // 'duration',
    { label: 'energy', average: averageEnergy, min: 0, max: 1 },
    {
      label: 'instrumentalness',
      average: averageInstrumentalness,
      min: 0,
      max: 1,
    },
    { label: 'liveness', average: averageLiveness, min: 0, max: 1 },
    {
      label: 'loudness',
      average: averageLoudness,
      min: -60,
      max: 0,
      extraInfo: 'dB',
    },
    { label: 'popularity', average: averagePopularity, min: 0, max: 100 },
    { label: 'speechiness', average: averageSpeechiness, min: 0, max: 1 },
    {
      label: 'tempo',
      average: averageTempo,
      min: 30,
      max: 250,
      extraInfo: 'BPM',
    },
    { label: 'valence', average: averageValence, min: 0, max: 1 },
  ];
  return (
    <div>
      <ul>
        {analysisPoints.map((point) => (
          <RecommendationSlider
            average={point.average}
            label={point.label}
            key={point.label}
            min={point.min}
            max={point.max}
            extra={point.extraInfo}
          />
        ))}
      </ul>
    </div>
  );
};

export default RecommendationsPage;
