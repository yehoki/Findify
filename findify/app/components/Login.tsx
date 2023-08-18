'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

interface LoginProps {
  off: boolean;
}

const Login: React.FC<LoginProps> = ({ off }) => {
  // const checkSession = async () => {
  //   const check = await useSession();
  // }

  const handleLogin = async () => {
    if (off) {
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
      Login with Spotify{' '}
      <div className="relative w-[25px] h-[25px]">
        <Image alt="Spotify logo" src={'/images/spotify-icon.png'} fill />
      </div>
    </button>
  );
};

export default Login;
