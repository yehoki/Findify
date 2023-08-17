'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const handleLogin = async () => {
    await signIn('spotify');
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
