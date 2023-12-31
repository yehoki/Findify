'use client';

import Image from 'next/image';
import { useLayoutEffect, useState } from 'react';

interface CarouselProps {}

const Carousel: React.FC<CarouselProps> = ({}) => {
  const images = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26,
  ];
  const singleWidth = 198;
  const [carouselTranslate, setCarouselTranslate] = useState(0);
  const [width, setWidth] = useState(0);
  const [perScroll, setPerScroll] = useState(0);
  const [currentScrolled, setCurrentScrolled] = useState(0);

  useLayoutEffect(() => {
    setWidth(window.innerWidth);
    const decideSingleWidth = () => {
      if (window.innerWidth > 1835) {
        setPerScroll(8);
      }
      if (window.innerWidth <= 1835 && window.innerWidth > 1540) {
        setPerScroll(7);
      }
      if (window.innerWidth <= 1540 && window.innerWidth > 1390) {
        setPerScroll(5);
      }
      if (window.innerWidth <= 1390 && window.innerWidth > 1155) {
        setPerScroll(4);
      }
      if (window.innerWidth <= 1155) {
        setPerScroll(2);
      }
    };
    decideSingleWidth();
    window.addEventListener('resize', decideSingleWidth);
    return () => {
      window.removeEventListener('resize', decideSingleWidth);
    };
  }, []);

  const handleButtonClick = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      if (carouselTranslate + perScroll * singleWidth >= 0) {
        setCarouselTranslate(0);
        setCurrentScrolled(0);
      } else if (carouselTranslate < 0) {
        setCarouselTranslate((prev) => prev + perScroll * singleWidth);
        setCurrentScrolled((prev) => prev - perScroll);
      }
    } else {
      if (currentScrolled + perScroll <= images.length - 1) {
        setCarouselTranslate((prev) => prev - perScroll * singleWidth);
        setCurrentScrolled((prev) => prev + perScroll);
      }
    }
  };

  return (
    <>
      <div className="flex gap-4 mb-4">
        {width},{currentScrolled}
        <button
          draggable={true}
          className="bg-yellow-100 h-5 w-20"
          onClick={() => handleButtonClick('left')}
        >
          Go Left
        </button>
        <button
          className="bg-yellow-100 h-5 w-20"
          onClick={() => handleButtonClick('right')}
        >
          Go Right
        </button>
      </div>
      <div
        style={{
          transform: `translateX(${carouselTranslate}px)`,
          translate: `translateX(${carouselTranslate}px)`,
        }}
        className="grid transition duration-500 gap-4
        grid-rows-1 grid-flow-col
        "
      >
        {images.map((numb) => (
          <div
            className="
rounded-md p-4
  bg-[#282828]
  cursor-pointer
  "
            key={numb}
          >
            <div className="relative w-[150px] h-[150px] mb-4">
              <Image src={'/images/spotify-icon.png'} fill alt="spotify icon" />
            </div>
            <div>
              <div>Title</div>
              <div>Artist(s)</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Carousel;
