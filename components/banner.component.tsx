'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export const BannerComponent = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [canScrollPage, setCanScrollPage] = useState(false);
  const containerRef = useRef(null);

  const images = [
    {
      id: 1,
      url: 'https://flowbite.s3.amazonaws.com/docs/device-mockups/laptop-screen.png',
      alt: '1',
    },
    {
      id: 2,
      url: 'https://flowbite.s3.amazonaws.com/docs/device-mockups/laptop-screen-dark.png',
      alt: '2',
    },
    {
      id: 3,
      url: 'https://flowbite.s3.amazonaws.com/docs/device-mockups/laptop-screen.png',
      alt: '3',
    },
    {
      id: 4,
      url: 'https://flowbite.s3.amazonaws.com/docs/device-mockups/laptop-screen-dark.png',
      alt: '4',
    },
  ];

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!canScrollPage) {
        e.preventDefault();

        if (e.deltaY > 0 && currentImageIndex < images.length - 1) {
          setCurrentImageIndex((prev) => prev + 1);
        } else if (e.deltaY < 0 && currentImageIndex > 0) {
          setCurrentImageIndex((prev) => prev - 1);
        } else if (e.deltaY > 0 && currentImageIndex === images.length - 1) {
          setCanScrollPage(true);
        }
      }
    };

    const preventScroll = (e: WheelEvent | TouchEvent) => {
      if (!canScrollPage) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', preventScroll);
    };
  }, [currentImageIndex, canScrollPage, images.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0 && canScrollPage) {
        setCanScrollPage(false);
        setCurrentImageIndex(images.length - 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [canScrollPage, images.length]);

  return (
    <div
      ref={containerRef}
      className="w-full min-h-[100vh] md:min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white flex flex-col justify-center items-center py-12"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col text-center md:text-left justify-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Full banner</h1>
            <p className="text-sm opacity-75">Sub title</p>
          </div>

          <div className="w-full justify-center">
            <div className="relative mx-auto border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
              <div className="rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={images[currentImageIndex].url}
                      width={512}
                      height={278}
                      className="rounded-lg"
                      alt={`${images[currentImageIndex].alt}`}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <div className="relative mx-auto bg-gray-900 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]">
              <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800"></div>
            </div>

            <div className="w-full flex justify-center">
              <div className="w-full max-w-[50%] bg-white/20 rounded-full h-2 mt-4">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentImageIndex + 1) / images.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
