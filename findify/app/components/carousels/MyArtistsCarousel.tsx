'use client';

import { ArtistObject, TrackObject } from '@/app/types/SpotifyTypes';
import Image from 'next/image';
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
}

const MyArtistsCarousel: React.FC<MyArtistsCarouselProps> = ({ myArtists }) => {
  const singleWidth = 198;
  const [carouselTranslate, setCarouselTranslate] = useState(0);
  const [width, setWidth] = useState(1920);
  const [perScroll, setPerScroll] = useState(0);
  const [currentScrolled, setCurrentScrolled] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useLayoutEffect(() => {
    setWidth(window.innerWidth);
    const decideSingleWidth = () => {
      setWidth(window.innerWidth);
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
    <div>
      <div className="flex justify-between">
        <h3 className="text-white text-xl font-semibold">Your Top Artists</h3>
        <div className="flex gap-4 mb-4">
          {width > 1024 && (
            <CarouselButton
              icon={PiCaretDoubleLeftLight}
              onClick={() => handleButtonClick('start')}
              isDisabled={carouselTranslate === 0}
            />
          )}
          <CarouselButton
            icon={PiCaretLeftLight}
            onClick={() => handleButtonClick('left')}
            isDisabled={carouselTranslate === 0}
          />
          <CarouselButton
            icon={PiCaretRightLight}
            onClick={() => handleButtonClick('right')}
            isDisabled={currentScrolled + perScroll >= myArtists.length - 1}
          />
          {width > 1024 && (
            <CarouselButton
              icon={PiCaretDoubleRightLight}
              onClick={() => handleButtonClick('end')}
              isDisabled={currentScrolled + perScroll >= myArtists.length - 1}
            />
          )}
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
          <SingleUserArtist key={artist.id} artist={artist} index={index} />
        ))}
      </div>
    </div>
  );
};

export default MyArtistsCarousel;
