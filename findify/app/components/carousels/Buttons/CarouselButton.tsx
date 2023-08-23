'use client';

import { IconType } from 'react-icons';

interface CarouselButtonProps {
  icon: IconType;
  onClick: () => void;
  isDisabled: boolean;
}

const CarouselButton: React.FC<CarouselButtonProps> = ({
  icon: Icon,
  onClick,
  isDisabled,
}) => {
  return (
    <button
      className={`
      active:scale-95
      ${isDisabled ? 'opacity-50' : ''}
      text-white rounded-full p-2 bg-[#282828]`}
      onClick={onClick}
      disabled={isDisabled}
    >
      <Icon size={18} />
    </button>
  );
};

export default CarouselButton;
