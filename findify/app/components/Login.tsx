'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

interface LoginProps {
  isLoggedIn: boolean;
}

const Login: React.FC<LoginProps> = ({ isLoggedIn }) => {
  // const checkSession = async () => {
  //   const check = await useSession();
  // }

  const handleLogin = async () => {
    if (isLoggedIn) {
      return await signOut();
    }
    return await signIn('spotify');
  };
  return (
    <button
      className="flex items-center gap-2 font-semibold text-lg
  border-white rounded-md border p-2
  "
      onClick={handleLogin}
    >
      {isLoggedIn ? (
        <>
          Login with Spotify{' '}
          <div className="relative w-[25px] h-[25px]">
            <Image alt="Spotify logo" src={'/images/spotify-icon.png'} fill />
          </div>
        </>
      ) : (
        <>Log out</>
      )}
    </button>
  );
};

export default Login;
