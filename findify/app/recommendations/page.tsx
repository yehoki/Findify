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
import HeaderUserProfile from '../components/HeaderUserProfile';
import MobileHeader from '../components/header/MobileHeader';
import SingleRandomTrack from '../components/tracks/Recommendations/SingleRandomTrack';
import RecommendationSliders from '../components/tracks/Recommendations/RecommendationSliders';
import UserRecommendations from '../components/tracks/Recommendations/UserRecommendations';

const RecommendationsPage = async ({}) => {
  const session = await getUserSession();
  if (!session) {
    return <div>Not logged in</div>;
  }

  return (
    <>
      <header
        className="bg-black md:bg-spotifyBlackBase py-4 md:py-0 md:h-16 w-full
          flex justify-between items-center md:block
          relative"
      >
        <HeaderUserProfile session={session} />
        <MobileHeader session={session} />
      </header>
      <div>
        <UserRecommendations session={session} />
        {/* <RecommendationForm
          analysisData={analysisPoints}
          songInformation={userTracks.items}
          session={session}
        />
        <div className="block flex-1 order-1 md:order-2 px-4">
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
                  <SingleRandomTrack
                    key={track.trackInfo.id}
                    trackAnalysis={track.trackAnalysis}
                    trackInfo={track.trackInfo}
                  />
                )
            )}
          </ul>
        </div> */}
      </div>
    </>
  );
};

export default RecommendationsPage;
