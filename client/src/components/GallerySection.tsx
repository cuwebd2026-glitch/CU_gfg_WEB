import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { Sparkles, Maximize2, ChevronUp, ChevronDown, Orbit, X, ChevronLeft, ChevronRight } from 'lucide-react';

import { galleryImages, GalleryImage } from '@/data/content';

export default function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitalStageRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Physics & Interaction States
  const isDragging = useRef(false);
  const isHovered = useRef(false);
  const startY = useRef(0);
  const hasMoved = useRef(false);
  const currentRotation = useRef(0);
  const targetRotation = useRef(0);

  const totalCards = galleryImages.length;
  const angleStep = (Math.PI * 2) / totalCards;

  // Run 3D Orbital Revolution Math + Auto-Rotation Loop
  useEffect(() => {
    let animationFrameId: number;

    const renderLoop = () => {
      if (!isDragging.current && !isHovered.current) {
        targetRotation.current += 0.003;
      }

      currentRotation.current += (targetRotation.current - currentRotation.current) * 0.08;

      if (orbitalStageRef.current) {
        const cards = orbitalStageRef.current.querySelectorAll('.orbital-card');
        const stageWidth = window.innerWidth;

        const radiusX = Math.min(stageWidth * 0.4, 620);
        const radiusY = 110;

        let closestIndex = 0;
        let maxZ = -Infinity;

        cards.forEach((card, index) => {
          const angle = (index * angleStep + currentRotation.current) % (Math.PI * 2);

          const x = Math.sin(angle) * radiusX;
          const y = Math.cos(angle) * radiusY;
          const z = Math.cos(angle) * 240;

          if (z > maxZ) {
            maxZ = z;
            closestIndex = index;
          }

          const normalizedZ = (z + 240) / 480;
          const scale = gsap.utils.clamp(0.6, 1.05, 0.6 + normalizedZ * 0.45);
          const opacity = gsap.utils.clamp(0.2, 1, 0.2 + normalizedZ * 0.8);
          const rotateY = -Math.sin(angle) * 25;

          gsap.set(card, {
            x: x,
            y: y,
            z: z,
            scale: scale,
            opacity: opacity,
            rotateY: rotateY,
            zIndex: Math.round(z + 600),
            transformPerspective: 1400,
          });
        });

        setActiveCardIndex(closestIndex);
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => cancelAnimationFrame(animationFrameId);
  }, [angleStep, totalCards]);

  // Pointer Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    hasMoved.current = false;
    startY.current = e.clientY;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaY = e.clientY - startY.current;
    if (Math.abs(deltaY) > 3) {
      hasMoved.current = true;
    }
    targetRotation.current += deltaY * 0.006;
    startY.current = e.clientY;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  // Wheel Handler
  const handleWheel = (e: React.WheelEvent) => {
    targetRotation.current += e.deltaY * 0.004;
  };

  // Stepper Controls
  const rotateNext = () => {
    targetRotation.current -= angleStep;
  };

  const rotatePrev = () => {
    targetRotation.current += angleStep;
  };

  // Lightbox Handlers
  const handleCloseLightbox = useCallback(() => setSelectedImage(null), []);

  const lightboxIndex = useMemo(() => {
    if (!selectedImage) return -1;
    return galleryImages.findIndex((img) => img.id === selectedImage.id);
  }, [selectedImage]);

  const handleLightboxPrev = useCallback(() => {
    if (lightboxIndex !== -1) {
      const prevIndex = (lightboxIndex - 1 + totalCards) % totalCards;
      setSelectedImage(galleryImages[prevIndex]);
    }
  }, [lightboxIndex, totalCards]);

  const handleLightboxNext = useCallback(() => {
    if (lightboxIndex !== -1) {
      const nextIndex = (lightboxIndex + 1) % totalCards;
      setSelectedImage(galleryImages[nextIndex]);
    }
  }, [lightboxIndex, totalCards]);

  return (
    <section
      id="gallery"
      className="py-12 md:py-20 bg-secondary/30 overflow-hidden select-none relative min-h-screen w-full flex flex-col justify-between"
      ref={containerRef}
    >
      {/* Header */}
      <div className="container px-4 mx-auto max-w-7xl text-center z-10 pt-2">
        <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1 rounded-full bg-[var(--gfg-green)]/10 border border-[var(--gfg-green)]/20 text-[var(--gfg-green)] text-xs font-mono font-semibold">
          <Sparkles size={14} />
          <span>Full-Screen 3D Revolution</span>
        </div>
        <h2 className="text-3xl md:text-6xl font-display font-bold text-foreground mb-3 tracking-tight">
          Chapter Gallery
        </h2>
        <p className="text-muted-foreground text-sm md:text-base flex items-center justify-center gap-2">
          <Orbit size={16} className="text-[var(--gfg-green)] animate-spin" style={{ animationDuration: '14s' }} />
          Auto-revolving orbit. Drag vertically, scroll wheel, or use controls to steer.
        </p>
      </div>

      {/* Stage Container */}
      <div
        className="relative h-[820px] w-full overflow-hidden cursor-grab active:cursor-grabbing touch-none flex items-center justify-center my-auto [perspective:1600px]"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onWheel={handleWheel}
        onMouseEnter={() => { isHovered.current = true; }}
        onMouseLeave={() => { isHovered.current = false; }}
      >
        {/* Orbit Ring */}
        <div className="absolute w-[80vw] max-w-[1200px] h-[260px] rounded-[100%] border border-[var(--gfg-green)]/25 shadow-[0_0_80px_rgba(40,167,69,0.12)] pointer-events-none [transform:rotateX(68deg)]" />

        {/* Center Core */}
        <div className="absolute w-16 h-16 rounded-full bg-[var(--gfg-green)]/20 border border-[var(--gfg-green)]/50 blur-md pointer-events-none animate-pulse" />

        <div
          ref={orbitalStageRef}
          className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d] will-change-transform"
        >
          {galleryImages.map((image, index) => {
            const isActive = index === activeCardIndex;
            return (
              <div
                key={image.id}
                onClick={() => {
                  if (!hasMoved.current) {
                    setSelectedImage(image);
                  }
                }}
                className={`orbital-card group absolute w-72 h-48 md:w-[480px] md:h-[320px] rounded-2xl border bg-card overflow-hidden shadow-2xl shrink-0 cursor-pointer transition-colors duration-300 will-change-transform ${
                  isActive
                    ? 'border-[var(--gfg-green)] ring-4 ring-[var(--gfg-green)]/40 shadow-[0_0_30px_rgba(40,167,69,0.3)]'
                    : 'border-border/80'
                }`}
              >
                <div className="relative w-full h-full overflow-hidden bg-black">
                  <img
                    src={image.src}
                    alt={image.alt || image.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 pointer-events-none"
                  />

                  {/* Glass Hover Footer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-5 pointer-events-auto">
                    <span className="text-sm font-semibold text-white truncate max-w-[80%] font-display">
                      {image.title}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(image);
                      }}
                      className="p-2.5 rounded-full bg-[var(--gfg-green)] text-[#04150a] shrink-0 shadow-md hover:scale-110 active:scale-95 transition-transform cursor-pointer z-30"
                      aria-label={`Zoom ${image.title}`}
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Controls */}
      <div className="flex items-center justify-center gap-6 z-20 pb-6">
        <button
          onClick={rotatePrev}
          aria-label="Revolve backward"
          className="p-3.5 rounded-full bg-card/80 backdrop-blur-md border border-border text-foreground hover:border-[var(--gfg-green)] hover:text-[var(--gfg-green)] transition-all duration-200 active:scale-95 shadow-lg cursor-pointer"
        >
          <ChevronUp size={20} />
        </button>
        <button
          onClick={rotateNext}
          aria-label="Revolve forward"
          className="p-3.5 rounded-full bg-card/80 backdrop-blur-md border border-border text-foreground hover:border-[var(--gfg-green)] hover:text-[var(--gfg-green)] transition-all duration-200 active:scale-95 shadow-lg cursor-pointer"
        >
          <ChevronDown size={20} />
        </button>
      </div>

      {/* Built-in Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={handleCloseLightbox}
        >
          <button 
            onClick={handleCloseLightbox}
            className="absolute top-6 right-6 p-3 rounded-full bg-card/80 text-foreground border border-border hover:border-[var(--gfg-green)] transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); handleLightboxPrev(); }}
            className="absolute left-6 p-3.5 rounded-full bg-card/80 text-foreground border border-border hover:border-[var(--gfg-green)] transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>

          <div 
            className="max-w-5xl max-h-[85vh] flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt || selectedImage.title}
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border border-border/60" 
            />
            <p className="text-white font-display text-lg font-medium">{selectedImage.title}</p>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); handleLightboxNext(); }}
            className="absolute right-6 p-3.5 rounded-full bg-card/80 text-foreground border border-border hover:border-[var(--gfg-green)] transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </section>
  );
}