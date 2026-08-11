import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryImage } from '@/data/content';

interface GalleryLightboxProps {
  image: GalleryImage;
  images: GalleryImage[];
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}

export default function GalleryLightbox({
  image,
  images,
  currentIndex,
  onPrev,
  onNext,
  onClose,
}: GalleryLightboxProps) {
  // Body scroll lock and keyboard listeners
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        onPrev();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onPrev, onNext, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Event image lightbox"
        onClick={handleBackdropClick}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between items-center p-4 md:p-8 select-none"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/10 backdrop-blur-md flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gfg-green)] cursor-pointer"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Navigation / Image / Metadata Row */}
        <div className="flex-1 w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 my-auto pt-12 md:pt-4 pb-4">
          
          {/* Previous Button (Desktop) */}
          <button
            onClick={onPrev}
            className="hidden md:flex w-12 h-12 rounded-full bg-white/5 hover:bg-[var(--gfg-green)] text-white hover:text-black border border-white/10 backdrop-blur-md items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gfg-green)] cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Centered Image Showcase */}
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative flex-1 max-h-[50vh] md:max-h-[75vh] w-full flex items-center justify-center"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="max-w-full max-h-full object-contain rounded-xl border border-white/10 shadow-2xl shadow-black/80 pointer-events-none"
            />
          </motion.div>

          {/* Metadata Card */}
          <motion.div
            key={`meta-${image.id}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="w-full md:w-[360px] bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between text-left shadow-xl"
          >
            <div>
              {/* Category Badge */}
              <div className="mb-3">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold font-mono tracking-wider uppercase bg-[var(--gfg-green)]/15 border border-[var(--gfg-green)]/35 text-[var(--gfg-green)]">
                  {image.category}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-white text-lg md:text-xl font-display font-semibold leading-snug mb-3">
                {image.title}
              </h2>

              {/* Description */}
              <p className="text-white/70 text-xs md:text-sm font-sans leading-relaxed mb-6 max-h-[160px] overflow-y-auto pr-2 scrollbar-none">
                {image.description}
              </p>
            </div>

            {/* Navigation Strip for Mobile/Small views + Counter */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex md:hidden gap-3">
                <button
                  onClick={onPrev}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[var(--gfg-green)] text-white hover:text-black border border-white/10 flex items-center justify-center transition-colors focus:outline-none cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={onNext}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[var(--gfg-green)] text-white hover:text-black border border-white/10 flex items-center justify-center transition-colors focus:outline-none cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Counter */}
              <span className="text-white/40 text-xs font-mono tracking-wide ml-auto">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          </motion.div>

          {/* Next Button (Desktop) */}
          <button
            onClick={onNext}
            className="hidden md:flex w-12 h-12 rounded-full bg-white/5 hover:bg-[var(--gfg-green)] text-white hover:text-black border border-white/10 backdrop-blur-md items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gfg-green)] cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </AnimatePresence>
  );
}
