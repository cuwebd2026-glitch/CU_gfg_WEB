import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
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

  // Identify adjacent images for preloading
  const prevImage = images.length > 1 ? images[(currentIndex - 1 + images.length) % images.length] : null;
  const nextImage = images.length > 1 ? images[(currentIndex + 1) % images.length] : null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Event image lightbox"
        onClick={handleBackdropClick}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-center items-center p-4 md:p-6 select-none"
      >
        {/* Hidden preloader for adjacent images */}
        <div style={{ display: 'none' }} aria-hidden="true">
          {prevImage && <img src={prevImage.src} alt="" />}
          {nextImage && <img src={nextImage.src} alt="" />}
        </div>

        {/* Close Button - × */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/10 backdrop-blur-md flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gfg-green)] cursor-pointer"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Lightbox Content Container */}
        <div className="w-full max-w-4xl flex flex-col items-center justify-center gap-5 mt-8 md:mt-4">
          
          {/* Centered Image Showcase */}
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative flex items-center justify-center max-h-[50vh] md:max-h-[60vh] w-full"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="max-w-full max-h-[50vh] md:max-h-[60vh] object-contain rounded-xl border border-white/10 shadow-2xl shadow-black/80 pointer-events-none"
            />
          </motion.div>

          {/* Text Metadata Panel */}
          <motion.div
            key={`meta-${image.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.05 }}
            className="w-full max-w-2xl text-center px-4 flex flex-col gap-4"
          >
            {/* Category */}
            <div>
              <span className="block text-[10px] md:text-xs font-mono font-bold tracking-widest uppercase text-[var(--gfg-green)] opacity-75">
                CATEGORY
              </span>
              <span className="block text-white text-sm md:text-base font-semibold mt-0.5">
                {image.category}
              </span>
            </div>

            {/* Title */}
            <div>
              <span className="block text-[10px] md:text-xs font-mono font-bold tracking-widest uppercase text-[var(--gfg-green)] opacity-75">
                TITLE
              </span>
              <h2 className="text-white text-base md:text-xl font-display font-bold leading-snug mt-0.5">
                {image.title}
              </h2>
            </div>

            {/* Description */}
            <div>
              <span className="block text-[10px] md:text-xs font-mono font-bold tracking-widest uppercase text-[var(--gfg-green)] opacity-75">
                DESCRIPTION
              </span>
              <p className="text-white/70 text-xs md:text-sm font-sans leading-relaxed max-h-[120px] overflow-y-auto pr-1 scrollbar-none mt-1">
                {image.description}
              </p>
            </div>
          </motion.div>

          {/* Controls Strip (← / → Navigation & Index Count) */}
          <div className="flex flex-col items-center gap-2 mt-2">
            <div className="flex items-center gap-8">
              <button
                onClick={onPrev}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[var(--gfg-green)] text-white hover:text-black border border-white/10 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gfg-green)] cursor-pointer"
                aria-label="Previous image"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={onNext}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[var(--gfg-green)] text-white hover:text-black border border-white/10 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gfg-green)] cursor-pointer"
                aria-label="Next image"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Counter */}
            <span className="text-white/40 text-xs font-mono tracking-wide mt-1">
              {currentIndex + 1} / {images.length}
            </span>
          </div>

        </div>
      </div>
    </AnimatePresence>
  );
}
