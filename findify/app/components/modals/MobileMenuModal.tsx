'use client';

import { onClose } from '@/app/reducers/mobileMenuReducer';
import { useMobileMenuSelector } from '@/app/store/store';
import { useCallback, useLayoutEffect, useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch } from 'react-redux';

interface MobileMenuModalProps {}

const MobileMenuModal: React.FC<MobileMenuModalProps> = ({}) => {
  const dispatch = useDispatch();
  const isOpen = useMobileMenuSelector(
    (state) => state.mobileMenuReducer.isOpen
  );
  const [screenWidth, setScreenWidth] = useState(0);

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
    </div>
  );
};

export default MobileMenuModal;
