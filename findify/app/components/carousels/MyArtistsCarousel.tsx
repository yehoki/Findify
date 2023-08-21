'use client';

import { ArtistObject, TrackObject } from '@/app/types/SpotifyTypes';
import Image from 'next/image';
import { useLayoutEffect, useState } from 'react';
import { AiOutlineCaretLeft, AiOutlineCaretRight } from 'react-icons/ai';
import { PiCaretLeftLight, PiCaretRightLight } from 'react-icons/pi';
interface MyArtistsCarouselProps {
  myArtists: ArtistObject[];
}

const MyArtistsCarousel: React.FC<MyArtistsCarouselProps> = ({ myArtists }) => {
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
      if (currentScrolled + perScroll <= myArtists.length - 1) {
        setCarouselTranslate((prev) => prev - perScroll * singleWidth);
        setCurrentScrolled((prev) => prev + perScroll);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-white text-xl font-semibold">Your Top Artists</h3>
        <div className="flex gap-4 mb-4">
          <button
            draggable={true}
            className="text-white rounded-full p-2 bg-[#282828]"
            onClick={() => handleButtonClick('left')}
          >
            <PiCaretLeftLight size={18} />
          </button>
          <button
            className="text-white rounded-full p-2 bg-[#282828]"
            onClick={() => handleButtonClick('right')}
          >
            <PiCaretRightLight size={18} />
          </button>
        </div>
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
        {myArtists.map((artist, index) => (
          <div
            className="rounded-md p-4 bg-[#282828] cursor-pointer"
            key={artist.id}
          >
            <div className="relative w-[150px] h-[150px] mb-4 rounded-full shadow-2xl">
              <Image
                src={`${artist.images[0].url}`}
                fill
                alt={`${artist.name} artist image`}
                className="rounded-full"
              />
            </div>
            <div>
              <div className="text-white font-semibold line-clamp-2">
                {index + 1}. {artist.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyArtistsCarousel;
