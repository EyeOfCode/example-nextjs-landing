'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const cards = [
  { id: 1, title: 'Card 1', content: 'This is the first card' },
  { id: 2, title: 'Card 2', content: 'This is the second card' },
  { id: 3, title: 'Card 3', content: 'This is the third card' },
  { id: 4, title: 'Card 4', content: 'This is the fourth card' },
  { id: 5, title: 'Card 5', content: 'This is the fifth card' },
  { id: 6, title: 'Card 6', content: 'This is the sixth card' },
  { id: 7, title: 'Card 7', content: 'This is the seventh card' },
];

const loopCards = [...cards, ...cards];

export const CarouselCardComponent = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [xOffset, setXOffset] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPaused || isDragging) return;

    const interval = setInterval(() => {
      setXOffset((prev) => prev - 20);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, isDragging]);

  useEffect(() => {
    if (Math.abs(xOffset) >= 100) {
      setXOffset(0);
    }
  }, [xOffset]);

  return (
    <div
      className="relative w-full mx-auto overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        ref={carouselRef}
        className="flex gap-4 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: -(cards.length * 200), right: 0 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        animate={{ x: `${xOffset}%` }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {loopCards.map((card, idx) => (
          <div key={idx} className="min-w-[20%] p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold">{card.title}</h2>
              <p className="text-gray-600">{card.content}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
