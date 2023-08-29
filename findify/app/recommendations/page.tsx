import getUserSession from '../actions/user/getUserSession';
import HeaderUserProfile from '../components/HeaderUserProfile';
import MobileHeader from '../components/header/MobileHeader';
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
      </div>
    </>
  );
};

export default RecommendationsPage;
