'use client';

import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';

interface MobileHeaderProps {
  session: Session | null;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ session }) => {
  return (
    <>
      {!session && (
        <>
          <h1 className="md:hidden text-white ml-8">Findify</h1>
          <button
            className="
 bg-white py-2 px-8 mr-8 text-black uppercase font-semibold tracking-wider 
 text-xs
 rounded-full
 md:hidden"
            onClick={() => signIn('spotify')}
          >
            Log in
          </button>
        </>
      )}
    </>
  );
};
export default MobileHeader;
