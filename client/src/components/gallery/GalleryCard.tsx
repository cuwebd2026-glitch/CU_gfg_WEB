import { motion } from 'motion/react';
import { GalleryImage } from '@/data/content';

interface GalleryCardProps {
  image: GalleryImage;
  onClick: () => void;
}

export default function GalleryCard({ image, onClick }: GalleryCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className="group relative flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-secondary/20 shadow-md shadow-black/10 hover:shadow-xl hover:shadow-black/20 cursor-pointer select-none"
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Natural full-color image with lazy loading */}
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />

      {/* Subtle bottom gradient and glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-90 transition-opacity duration-300 flex flex-col justify-end p-5 md:p-6">
        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
          {/* Category Badge */}
          <div className="mb-2">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold font-mono tracking-wider uppercase bg-[var(--gfg-green)]/15 border border-[var(--gfg-green)]/35 text-[var(--gfg-green)]">
              {image.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-white text-base md:text-lg font-display font-semibold leading-snug mb-1 text-shadow-sm">
            {image.title}
          </h3>

          {/* Description - expanding with height/opacity transition */}
          <p className="text-white/70 text-xs md:text-sm font-sans line-clamp-2 md:line-clamp-3 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out max-h-0 group-hover:max-h-24 overflow-hidden mt-1">
            {image.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
