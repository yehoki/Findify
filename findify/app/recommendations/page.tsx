import Image from 'next/image';
import getMultipleTrackAnalysis from '../actions/tracks/getMultipleTrackAnalysis';
import getUserTracks from '../actions/user/getUserTracks';
import DisplaySingleTrack from '../components/tracks/DisplaySingleTrack';
import RecommendationForm from '../components/tracks/Recommendations/RecommendationForm';
import RecommendationSlider from '../components/tracks/Recommendations/RecommendationSlider';
import { AudioFeaturesObject, TrackObject } from '../types/SpotifyTypes';
import getUserSession from '../actions/user/getUserSession';
import { parseArtists } from '../config/helper';
import Link from 'next/link';

const RecommendationsPage = async ({}) => {
  const session = await getUserSession();
  if (!session) {
    return <div>Not logged in</div>;
  }

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

  const randomNumbers = () => {
    const nums = new Set<number>();
    while (nums.size !== 5) {
      nums.add(
        Math.floor(Math.random() * topTrackAnalysis.audio_features.length)
      );
    }
    return nums;
  };

  const combineTracksWithAnalysis = () => {
    const randoms = randomNumbers();
    const combinedTracks: {
      trackAnalysis: AudioFeaturesObject;
      trackInfo: TrackObject | undefined;
    }[] = [];
    randoms.forEach((random) => {
      const trackAnalysis = topTrackAnalysis.audio_features[random];
      const trackInfo = userTracks.items.find(
        (track) => track.id === trackAnalysis.id
      );
      combinedTracks.push({
        trackInfo: trackInfo,
        trackAnalysis: trackAnalysis,
      });
    });
    return combinedTracks;
  };

  return (
    <div className="flex gap-4">
      <RecommendationForm
        analysisData={analysisPoints}
        songInformation={userTracks.items}
        session={session}
      />
      <div className="hidden lg:block lg:flex-1">
        <h4 className="text-xl text-white font-semibold mb-1">
          Some songs you are familiar with
        </h4>
        <h5 className="text-sm text-spotifyOffWhite font-semibold mb-4">
          Choose a track for which you want some similar recommendations
        </h5>
        <ul className="w-full">
          {combineTracksWithAnalysis().map(
            (track) =>
              track.trackInfo && (
                <li
                  key={track.trackAnalysis.id}
                  className="mb-2 px-2 py-2 bg-[#181818] hover:bg-[#252525] 
                  transition duration-300
                  rounded-md w-full
                  focus-within:bg-[#252525]
                  "
                >
                  <div className="flex gap-4">
                    <Link
                      href={`/track/${track.trackInfo.id}`}
                      className="outline-none"
                    >
                      <div className="relative w-[100px] h-[100px]">
                        <Image
                          src={track.trackInfo.album.images[0].url}
                          alt={`${track.trackInfo.name} album cover`}
                          fill
                        />
                      </div>
                    </Link>
                    <div className="font-semibold">
                      <h5 className="text-white">
                        <Link
                          href={`/track/${track.trackInfo.id}`}
                          className="outline-none hover:underline"
                        >
                          {track.trackInfo.name}
                        </Link>
                      </h5>
                      <p className="text-spotifyOffWhite text-sm line-clamp-1 mb-2">
                        by{' '}
                        {parseArtists(
                          track.trackInfo.artists.map((artist) => artist.name)
                        )}
                      </p>
                      <div
                        className="w-full grid grid-cols-2 grid-rows-2 
                      gap-y-2 gap-x-4 2xl:gap-x-8 2xl:gap-y-2
                      text-spotifyOffWhite text-sm
                      "
                      >
                        <p className="line-clamp-1">
                          Energy: {track.trackAnalysis.energy.toFixed(2)}
                        </p>
                        <p className="line-clamp-1">
                          Danceability:{' '}
                          {track.trackAnalysis.danceability.toFixed(2)}
                        </p>
                        <p className="line-clamp-1">
                          Popularity: {track.trackInfo.popularity}
                        </p>
                        <p className="line-clamp-1">
                          Tempo: {track.trackAnalysis.tempo.toFixed(0)} BPM
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
};

export default RecommendationsPage;
