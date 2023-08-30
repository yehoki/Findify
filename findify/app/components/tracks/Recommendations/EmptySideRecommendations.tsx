'use client';

import { signIn } from 'next-auth/react';

interface EmptySideRecommendationsProps {
  status: 'loggedOut' | 'failed';
}

const EmptySideRecommendations: React.FC<EmptySideRecommendationsProps> = ({
  status,
}) => {
  return (
    <>
      {status === 'loggedOut' && (
        <div
          className="group px-2 py-1 mt-4 mx-2 rounded-md
        hover:bg-[#1a1a1a] transition duration-300
        group cursor-pointer"
          onClick={() => signIn('spotify')}
        >
          <h3 className="text-lg text-white font-semibold">
            Log in with your Spotify account
          </h3>
          <h4 className="text-sm text-spotifyOffWhite">
            See your personalized track recommendations
          </h4>
        </div>
      )}
      {status === 'failed' && (
        <div
          className="group px-2 py-1 mt-4 mx-2 rounded-md
        hover:bg-[#1a1a1a] transition duration-300"
        >
          <h3 className="text-lg text-white font-semibold">
            There was a problem
          </h3>
          <h4 className="text-sm text-spotifyOffWhite">
            Try playing some tracks on Spotify to restart your listening history
          </h4>
        </div>
      )}
    </>
  );
};

export default EmptySideRecommendations;
