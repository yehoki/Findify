'use client';

import { Session } from 'next-auth';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { signIn, signOut } from 'next-auth/react';

interface HeaderUserProfileProps {
  session: Session | null;
}

const HeaderUserProfile: React.FC<HeaderUserProfileProps> = ({ session }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleOnClick = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <>
      {session && (
        <>
          <button
            onClick={handleOnClick}
            className="absolute right-10 top-6 hover:opacity-90 hover:scale-105"
          >
            <div className="w-fit h-fit rounded-full p-1 bg-black">
              <div className="relative rounded-full w-6 h-6 bg-black">
                <Image
                  src={
                    session?.user.image
                      ? session.user.image
                      : '/images/spotify-icon.png'
                  }
                  fill
                  alt="User image"
                  className="rounded-full"
                />
              </div>
            </div>
          </button>
          {isExpanded && (
            <div
              className="absolute right-10 top-16 
        text-spotifyOffWhite bg-spotifyGray p-1
        min-w-[196px] z-[9999] shadow-md
        "
            >
              <ul>
                <li className="">
                  <button
                    className="hover:bg-spotifyLighterGray p-3 
              w-full text-left text-sm"
                  >
                    <span className="">Account</span>
                  </button>
                </li>
                <li className="">
                  <button
                    className="hover:bg-spotifyLighterGray p-3 
              w-full text-left text-sm"
                  >
                    <span className="">Profile</span>
                  </button>
                </li>
                <li className="">
                  <button
                    onClick={() => signOut()}
                    className="hover:bg-spotifyLighterGray p-3 
              w-full text-left text-sm"
                  >
                    <span className="">Log out</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </>
      )}
      {!session && (
        <>
          <button
            className="
          absolute top-0 right-0
          bg-white rounded-full py-3 px-8 text-black font-semibold
          hover:scale-105 hover:opacity-90
          "
            onClick={() => signIn('spotify')}
          >
            Log in
          </button>
        </>
      )}
    </>
  );
};

export default HeaderUserProfile;
