'use client';

import { onClose } from '@/app/reducers/mobileMenuReducer';
import { useMobileMenuSelector } from '@/app/store/store';
import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch } from 'react-redux';

interface MobileMenuModalProps {
  session: Session | null;
}

const MobileMenuModal: React.FC<MobileMenuModalProps> = ({ session }) => {
  const dispatch = useDispatch();
  const isOpen = useMobileMenuSelector(
    (state) => state.mobileMenuReducer.isOpen
  );
  const [screenWidth, setScreenWidth] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      dispatch(onClose());
    }
  }, [router]);

  useLayoutEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleCloseModal = useCallback(() => {
    if (isOpen) {
      return dispatch(onClose());
    }
  }, [isOpen, dispatch]);

  return (
    <div
      style={{ transform: `translateX(${isOpen ? 0 : screenWidth}px)` }}
      className={`w-full h-full bg-black text-white fixed z-[9999]
    ${isOpen ? 'opacity-100' : 'opacity-0'} transition
    `}
    >
      <button onClick={handleCloseModal}>
        <RxCross1 size={24} className="absolute top-4 right-4 text-white" />
      </button>
      <div className="mt-16">
        <ul className="px-8">
          {session && (
            <>
              <li className="hover:scale-110 mb-4 text-xl transition w-fit">
                <Link onClick={handleCloseModal} href={'/recommendations'}>
                  Your Recommendations
                </Link>
              </li>
              <li className="hover:scale-110 mb-4 text-xl transition w-fit">
                <Link onClick={handleCloseModal} href={'/search'}>
                  Search
                </Link>
              </li>
              <li className="hover:scale-110 mb-4 text-xl transition w-fit">
                <a
                  href="https://www.spotify.com/uk/account/overview/"
                  target="_blank"
                >
                  Account
                </a>
              </li>
              <li className="hover:scale-110 mb-4 text-xl transition w-fit">
                <a
                  href={`${
                    session && session.user && session.user.userId
                      ? `https://open.spotify.com/user/${session.user.userId}`
                      : 'https://open.spotify.com'
                  }`}
                  target="_blank"
                >
                  Profile
                </a>
              </li>
              <li className="hover:scale-110 mb-4 text-xl transition w-fit">
                <button
                  onClick={() => {
                    signOut();
                  }}
                >
                  Log Out
                </button>
              </li>
            </>
          )}
          {!session && (
            <>
              <li className="hover:scale-110 mb-4 text-xl transition w-fit">
                <button
                  onClick={() => {
                    signIn('spotify');
                  }}
                >
                  Log In
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MobileMenuModal;
