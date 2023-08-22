'use client';

import { Session } from 'next-auth';
import Image from 'next/image';
import { useCallback, useState } from 'react';

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
      <button
        onClick={handleOnClick}
        className="absolute right-0 top-0 active:opacity-75"
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
          className="absolute right-0 top-10 
        text-spotifyOffWhite bg-spotifyGray p-1
        min-w-[196px] z-[1000]
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
  );
};

export default HeaderUserProfile;
