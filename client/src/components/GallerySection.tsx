import { useState, useCallback, useMemo } from 'react';
import { motion } from 'motion/react';
import { galleryImages, GalleryImage } from '@/data/content';
import EventCarousel from './gallery/EventCarousel';
import GalleryLightbox from './gallery/GalleryLightbox';

// Group images by category outside the component to maintain stable references and avoid re-filtering on every render
const egtImages = galleryImages.filter(
  (img) => img.category === 'Engineering Graphics & Technology'
);
const quizImages = galleryImages.filter(
  (img) => img.category === 'Quiz Arena'
);
const roboImages = galleryImages.filter(
  (img) => img.category === 'Roboverse'
);

export default function GallerySection() {
  // Lightbox selection states
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Stable callback for card click prevents child EventCarousels from re-rendering when lightbox opens/closes
  const handleCardClick = useCallback((image: GalleryImage) => {
    setSelectedImage(image);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  // Filter lightbox images to the currently selected category to preserve correct ordering
  const activeImages = useMemo(() => {
    if (!selectedImage) return [];
    return galleryImages.filter((img) => img.category === selectedImage.category);
  }, [selectedImage]);

  const currentIndex = useMemo(() => {
    if (!selectedImage) return -1;
    return activeImages.findIndex((img) => img.id === selectedImage.id);
  }, [selectedImage, activeImages]);

  const handlePrev = useCallback(() => {
    if (currentIndex !== -1 && activeImages.length > 0) {
      const prevIndex = (currentIndex - 1 + activeImages.length) % activeImages.length;
      setSelectedImage(activeImages[prevIndex]);
    }
  }, [currentIndex, activeImages]);

  const handleNext = useCallback(() => {
    if (currentIndex !== -1 && activeImages.length > 0) {
      const nextIndex = (currentIndex + 1) % activeImages.length;
      setSelectedImage(activeImages[nextIndex]);
    }
  }, [currentIndex, activeImages]);

  return (
    <section id="gallery" className="py-20 md:py-32 bg-secondary/40 overflow-hidden">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[var(--gfg-green)]" />
            <span className="text-xs font-mono text-[var(--gfg-green)] uppercase tracking-wider">
              Moments
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Event Showcase
          </h2>
          <p className="text-muted-foreground">
            Snapshots and highlights from our workshops, hackathons, and technical bootcamps.
          </p>
        </motion.div>

        {/* Categories Rows */}
        <div className="space-y-16 md:space-y-24">
          
          {/* Row 1: Engineering Graphics & Technology */}
          {egtImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              <div className="px-2 md:px-4 text-left">
                <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground mb-1">
                  Engineering Graphics & Technology
                </h3>
                <p className="text-sm text-muted-foreground max-w-3xl">
                  Practical learning, technical drafting, and collaborative design workshops focused on CAD systems and spatial visualization.
                </p>
              </div>
              <EventCarousel images={egtImages} onCardClick={handleCardClick} />
            </motion.div>
          )}

          {/* Row 2: Quiz Arena */}
          {quizImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              <div className="px-2 md:px-4 text-left">
                <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground mb-1">
                  Quiz Arena
                </h3>
                <p className="text-sm text-muted-foreground max-w-3xl">
                  High-energy competitions testing logical reasoning, algorithmic thinking, and rapid problem-solving where student teams race the clock.
                </p>
              </div>
              <EventCarousel images={quizImages} onCardClick={handleCardClick} />
            </motion.div>
          )}

          {/* Row 3: Roboverse */}
          {roboImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              <div className="px-2 md:px-4 text-left">
                <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground mb-1">
                  Roboverse
                </h3>
                <p className="text-sm text-muted-foreground max-w-3xl">
                  Hands-on robotics assemblies, controller code tuning, and autonomous system demonstrations showcasing engineering innovation.
                </p>
              </div>
              <EventCarousel images={roboImages} onCardClick={handleCardClick} />
            </motion.div>
          )}

        </div>
      </div>

      {/* Lightbox Integration */}
      {selectedImage && (
        <GalleryLightbox
          image={selectedImage}
          images={activeImages}
          currentIndex={currentIndex}
          onPrev={handlePrev}
          onNext={handleNext}
          onClose={handleCloseLightbox}
        />
      )}
    </section>
  );
}
