import { memo } from 'react';
import { motion } from 'motion/react';
import { GalleryImage } from '@/data/content';

interface GalleryCardProps {
  image: GalleryImage;
  onClick: () => void;
}

const GalleryCard = memo(function GalleryCard({ image, onClick }: GalleryCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className="group relative flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-secondary/20 shadow-md shadow-black/10 hover:shadow-xl hover:shadow-black/20 cursor-pointer select-none [transform:translate3d(0,0,0)] will-change-transform"
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Optimized thumbnail WebP image with lazy loading and async decoding */}
      <img
        src={image.thumbnail || image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />

      {/* Subtle bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-5 md:p-6">
        {/* Title */}
        <h3 className="text-white text-base md:text-lg font-display font-semibold leading-snug text-shadow-sm">
          {image.title}
        </h3>
      </div>
    </motion.div>
  );
});

export default GalleryCard;
