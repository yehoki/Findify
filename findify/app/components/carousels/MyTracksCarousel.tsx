'use client';

import { TrackObject } from '@/app/types/SpotifyTypes';
import Image from 'next/image';
import { useLayoutEffect, useState } from 'react';

interface MyTracksCarouselProps {
  myTracks: TrackObject[];
}

const MyTracksCarousel: React.FC<MyTracksCarouselProps> = ({ myTracks }) => {
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
      if (currentScrolled + perScroll <= myTracks.length - 1) {
        setCarouselTranslate((prev) => prev - perScroll * singleWidth);
        setCurrentScrolled((prev) => prev + perScroll);
      }
    }
  };

  return (
    <>
      <div className="flex gap-4 mb-4">
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
        {myTracks.map((track, index) => (
          <div
            className="rounded-md p-4 bg-[#282828] cursor-pointer"
            key={track.id}
          >
            <div className="relative w-[150px] h-[150px] mb-4 rounded-md shadow-lg">
              <Image
                src={`${track.album.images[0].url}`}
                fill
                alt={`${track.name} album cover`}
                className="rounded-md"
              />
            </div>
            <div>
              <div className="text-white font-semibold line-clamp-2">
                {index + 1}. {track.name}
              </div>
              <div className="text-[#6a6a6a]">Artist(s)</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyTracksCarousel;
