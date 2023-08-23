'use client';

import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import { RxHamburgerMenu } from 'react-icons/rx';
interface MobileHeaderProps {
  session: Session | null;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ session }) => {
  return (
    <>
      {!session && (
        <>
          <h1 className="md:hidden text-white ml-2 text-lg">Findify</h1>
          <button
            className="
 bg-white py-2 px-8 mr-2 text-black uppercase font-semibold tracking-wider 
 text-xs
 rounded-full
 md:hidden"
            onClick={() => signIn('spotify')}
          >
            Log in
          </button>
        </>
      )}
      {session && (
        <>
          <h1 className="md:hidden text-white ml-2 text-lg">Findify</h1>
          <button className="md:hidden text-white mr-2">
            <RxHamburgerMenu size={32} />
          </button>
        </>
      )}
    </>
  );
};
export default MobileHeader;
