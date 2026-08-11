import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryImage } from '@/data/content';
import GalleryCard from './GalleryCard';

interface EventCarouselProps {
  images: GalleryImage[];
  onCardClick: (image: GalleryImage) => void;
}

export default function EventCarousel({ images, onCardClick }: EventCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Drag states
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const dragDistance = useRef(0);
  
  // Active dragging cursor state
  const [activeDrag, setActiveDrag] = useState(false);
  
  // Arrow button visibility
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const updateArrows = () => {
    const container = containerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 10);
      setShowRightArrow(
        container.scrollLeft + container.clientWidth < container.scrollWidth - 10
      );
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    updateArrows();

    window.addEventListener('resize', updateArrows);
    
    // Custom non-passive event listener for horizontal mouse wheel scrolling
    const handleNativeWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        const canScrollLeft = container.scrollLeft > 0 && e.deltaY < 0;
        const canScrollRight = container.scrollLeft + container.clientWidth < container.scrollWidth && e.deltaY > 0;
        
        if (canScrollLeft || canScrollRight) {
          e.preventDefault();
          container.scrollLeft += e.deltaY * 0.8;
          updateArrows();
        }
      }
    };

    container.addEventListener('wheel', handleNativeWheel, { passive: false });
    
    return () => {
      window.removeEventListener('resize', updateArrows);
      container.removeEventListener('wheel', handleNativeWheel);
    };
  }, [images]);

  // Pointer interaction for dragging on desktop
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    isDragging.current = true;
    startX.current = e.clientX;
    scrollLeftStart.current = container.scrollLeft;
    dragDistance.current = 0;
    
    setActiveDrag(true);
    container.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const container = containerRef.current;
    if (!container) return;

    const dx = e.clientX - startX.current;
    dragDistance.current = Math.abs(dx);
    container.scrollLeft = scrollLeftStart.current - dx;
    updateArrows();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setActiveDrag(false);
    
    const container = containerRef.current;
    if (container) {
      container.releasePointerCapture(e.pointerId);
    }
  };

  const handleCaptureClick = (e: React.MouseEvent) => {
    // Prevent standard onClick handler if movement exceeded the 5px dragging threshold
    if (dragDistance.current > 5) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  const scrollByAmount = (direction: 'left' | 'right') => {
    const container = containerRef.current;
    if (!container) return;
    
    const cardWidth = 340; // Approx card width + gap
    const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;
    
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
    
    setTimeout(updateArrows, 400);
  };

  return (
    <div className="relative group/carousel w-full">
      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      {/* Left Chevron Button */}
      <AnimatePresence>
        {showLeftArrow && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => scrollByAmount('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/75 hover:bg-[var(--gfg-green)] text-white hover:text-black border border-white/10 backdrop-blur-md flex items-center justify-center transition-colors shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gfg-green)] cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Drag Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClickCapture={handleCaptureClick}
        onScroll={updateArrows}
        className={`scrollbar-none w-full flex gap-5 md:gap-6 overflow-x-auto py-4 px-2 md:px-4 select-none touch-pan-x ${
          activeDrag ? 'cursor-grabbing' : 'cursor-grab'
        } scroll-smooth`}
      >
        {images.map((img) => (
          <GalleryCard
            key={img.id}
            image={img}
            onClick={() => onCardClick(img)}
          />
        ))}
      </div>

      {/* Right Chevron Button */}
      <AnimatePresence>
        {showRightArrow && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => scrollByAmount('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/75 hover:bg-[var(--gfg-green)] text-white hover:text-black border border-white/10 backdrop-blur-md flex items-center justify-center transition-colors shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gfg-green)] cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
