'use client';

import { onOpen } from '@/app/reducers/mobileMenuReducer';
import { useMobileMenuSelector } from '@/app/store/store';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useDispatch } from 'react-redux';
interface MobileHeaderProps {
  session: Session | null;
  children?: React.ReactNode;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ session, children }) => {
  const dispatch = useDispatch();
  const isOpen = useMobileMenuSelector(
    (state) => state.mobileMenuReducer.isOpen
  );
  const handleOpenModal = () => {
    if (!isOpen) {
      return dispatch(onOpen());
    }
  };
  return (
    <>
      {/* {!session && (
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
      )} */}
      <h1 className="md:hidden text-white ml-2 text-lg">
        <Link href={'/'}>Findify</Link>
      </h1>
      {children}
      <button className="md:hidden text-white mr-2" onClick={handleOpenModal}>
        <RxHamburgerMenu size={32} />
      </button>
    </>
  );
};
export default MobileHeader;
