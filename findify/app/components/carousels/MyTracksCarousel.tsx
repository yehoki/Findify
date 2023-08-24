'use client';

import { parseArtists } from '@/app/config/helper';
import { ArtistObject, TrackObject } from '@/app/types/SpotifyTypes';
import Image from 'next/image';
import { useLayoutEffect, useState } from 'react';
import {
  PiCaretDoubleLeftLight,
  PiCaretDoubleRightLight,
  PiCaretLeftLight,
  PiCaretRightLight,
} from 'react-icons/pi';
import SingleUserTrack from '../tracks/SingleUserTrack';
import CarouselButton from './Buttons/CarouselButton';
interface MyTracksCarouselProps {
  myTracks: TrackObject[];
}

const MyTracksCarousel: React.FC<MyTracksCarouselProps> = ({ myTracks }) => {
  const [carouselTranslate, setCarouselTranslate] = useState(0);
  const [width, setWidth] = useState(0);
  const [perScroll, setPerScroll] = useState(0);
  const [currentScrolled, setCurrentScrolled] = useState(0);
  const [singleWidth, setSingleWidth] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useLayoutEffect(() => {
    setWidth(window.innerWidth);
    const decideSingleWidth = () => {
      if (window.innerWidth <= 768) {
        setSingleWidth(148);
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
      if (currentScrolled + perScroll <= myTracks.length - 1) {
        setIsScrolling(true);
        setCarouselTranslate((prev) => prev - perScroll * singleWidth);
        setCurrentScrolled((prev) => prev + perScroll);
        setTimeout(() => {
          setIsScrolling(false);
        }, 500);
      }
    } else {
      if (currentScrolled + perScroll <= myTracks.length - 1) {
        setIsScrolling(true);
        setCarouselTranslate(
          -1 * (myTracks.length - (perScroll - 1)) * singleWidth
        );
        setCurrentScrolled(myTracks.length - 1 - perScroll);
        setTimeout(() => {
          setIsScrolling(false);
        }, 500);
      }
    }
  };

  return (
    <div className="px-2">
      <div className="flex justify-between">
        <h3 className="text-white text-xl font-semibold">Your Top Tracks</h3>
        <div className="flex gap-2 md:gap-4 mb-4">
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
              width === 0 || currentScrolled + perScroll >= myTracks.length - 1
            }
          />
          <CarouselButton
            icon={PiCaretDoubleRightLight}
            onClick={() => handleButtonClick('end')}
            isDisabled={
              width === 0 || currentScrolled + perScroll >= myTracks.length - 1
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
    "
      >
        {myTracks.map((track, index) => (
          <SingleUserTrack key={track.id} track={track} index={index} />
        ))}
      </div>
    </div>
  );
};

export default MyTracksCarousel;
