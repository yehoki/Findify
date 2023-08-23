'use client';

import { parseArtists } from '@/app/config/helper';
import { ArtistObject, TrackObject } from '@/app/types/SpotifyTypes';
import Image from 'next/image';
import { useLayoutEffect, useState } from 'react';
import { PiCaretLeftLight, PiCaretRightLight } from 'react-icons/pi';
import SingleUserTrack from '../tracks/SingleUserTrack';
import CarouselButton from './Buttons/CarouselButton';
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
    <div>
      <div className="flex justify-between">
        <h3 className="text-white text-xl font-semibold">Your Top Tracks</h3>
        <div className="flex gap-4 mb-4">
          <CarouselButton
            icon={PiCaretLeftLight}
            onClick={() => handleButtonClick('left')}
            isDisabled={carouselTranslate === 0}
          />
          <CarouselButton
            icon={PiCaretRightLight}
            onClick={() => handleButtonClick('right')}
            isDisabled={currentScrolled + perScroll > myTracks.length - 1}
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
