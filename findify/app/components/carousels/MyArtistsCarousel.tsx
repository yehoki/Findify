'use client';

import { ArtistObject } from '@/app/types/SpotifyTypes';
import { useLayoutEffect, useState } from 'react';
import {
  PiCaretDoubleLeftLight,
  PiCaretDoubleRightLight,
  PiCaretLeftLight,
  PiCaretRightLight,
} from 'react-icons/pi';
import SingleUserArtist from '../artists/SingleUserArtist';
import CarouselButton from './Buttons/CarouselButton';
interface MyArtistsCarouselProps {
  myArtists: ArtistObject[];
  isIndex?: boolean;
  heading?: string;
}

const MyArtistsCarousel: React.FC<MyArtistsCarouselProps> = ({
  myArtists,
  isIndex = true,
  heading = 'Your Top Artists',
}) => {
  const [carouselTranslate, setCarouselTranslate] = useState(0);
  const [width, setWidth] = useState(1920);
  const [perScroll, setPerScroll] = useState(0);
  const [currentScrolled, setCurrentScrolled] = useState(0);
  const [singleWidth, setSingleWidth] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useLayoutEffect(() => {
    setCarouselTranslate(0);
    setCurrentScrolled(0);
  }, [myArtists]);

  useLayoutEffect(() => {
    setWidth(window.innerWidth);
    const decideSingleWidth = () => {
      if (window.innerWidth <= 768) {
        setSingleWidth(148);
        setCarouselTranslate(0);
        setCurrentScrolled(0);
      } else {
        setSingleWidth(198);
      }
      setWidth(window.innerWidth);
      if (window.innerWidth > 1540) {
        setPerScroll(6);
      }
      if (window.innerWidth <= 1540 && window.innerWidth > 1390) {
        setPerScroll(5);
      }
      if (window.innerWidth <= 1390 && window.innerWidth > 1155) {
        setPerScroll(4);
      }
      if (window.innerWidth <= 1155 && window.innerWidth > 768) {
        setPerScroll(2);
      }
      if (window.innerWidth <= 768 && window.innerWidth > 600) {
        setPerScroll(4);
      }
      if (window.innerWidth <= 600 && window.innerWidth > 445) {
        setPerScroll(3);
      }
      if (window.innerWidth <= 445) {
        setPerScroll(2);
      }
    };
    decideSingleWidth();
    window.addEventListener('resize', decideSingleWidth);
    return () => {
      window.removeEventListener('resize', decideSingleWidth);
    };
  }, []);

  const handleButtonClick = (direction: 'start' | 'left' | 'right' | 'end') => {
    if (isScrolling) {
      return;
    }
    if (direction === 'start') {
      if (carouselTranslate < 0) {
        setIsScrolling(false);
        setCarouselTranslate(0);
        setCurrentScrolled(0);
        setTimeout(() => {
          setIsScrolling(false);
        }, 500);
      }
    } else if (direction === 'left') {
      if (carouselTranslate + perScroll * singleWidth >= 0) {
        setIsScrolling(true);
        setCarouselTranslate(0);
        setCurrentScrolled(0);

        setTimeout(() => {
          setIsScrolling(false);
        }, 500);
      } else if (carouselTranslate < 0) {
        setIsScrolling(true);
        setCarouselTranslate((prev) => prev + perScroll * singleWidth);
        setCurrentScrolled((prev) => prev - perScroll);
        setTimeout(() => {
          setIsScrolling(false);
        }, 500);
      }
    } else if (direction === 'right') {
      if (currentScrolled + perScroll <= myArtists.length - 1) {
        setIsScrolling(true);
        setCarouselTranslate((prev) => prev - perScroll * singleWidth);
        setCurrentScrolled((prev) => prev + perScroll);
        setTimeout(() => {
          setIsScrolling(false);
        }, 500);
      }
    } else {
      if (currentScrolled + perScroll <= myArtists.length - 1) {
        setIsScrolling(true);
        setCarouselTranslate(
          -1 * (myArtists.length - (perScroll - 1)) * singleWidth
        );
        setCurrentScrolled(myArtists.length - 1 - perScroll);
        setTimeout(() => {
          setIsScrolling(false);
        }, 500);
      }
    }
  };

  return (
    <div className="px-2">
      <div className="flex justify-between mb-4">
        <h3 className="text-white text-xl font-semibold">{heading}</h3>
        <div className="hidden md:flex gap-4">
          <CarouselButton
            icon={PiCaretDoubleLeftLight}
            onClick={() => handleButtonClick('start')}
            isDisabled={width === 0 || carouselTranslate === 0}
          />
          <CarouselButton
            icon={PiCaretLeftLight}
            onClick={() => handleButtonClick('left')}
            isDisabled={width === 0 || carouselTranslate === 0}
          />
          <CarouselButton
            icon={PiCaretRightLight}
            onClick={() => handleButtonClick('right')}
            isDisabled={
              width === 0 || currentScrolled + perScroll >= myArtists.length - 1
            }
          />
          <CarouselButton
            icon={PiCaretDoubleRightLight}
            onClick={() => handleButtonClick('end')}
            isDisabled={
              width === 0 || currentScrolled + perScroll >= myArtists.length - 1
            }
          />
        </div>
      </div>
      <div
        style={{
          transform: `translateX(${carouselTranslate}px)`,
          translate: `translateX(${carouselTranslate}px)`,
        }}
        className="grid transition duration-500 gap-4
    grid-rows-1 grid-flow-col 
    overflow-x-auto md:overflow-x-visible
    pb-2 md:pb-0
    "
      >
        {myArtists.map((artist, index) => (
          <SingleUserArtist
            key={artist.id}
            artist={artist}
            index={index}
            isIndex={isIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default MyArtistsCarousel;
