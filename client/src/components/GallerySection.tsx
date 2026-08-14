import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { Sparkles, Maximize2, ChevronUp, ChevronDown, RotateCw, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages, GalleryImage } from '@/data/content';

export default function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Physics & Control States
  const isDragging = useRef(false);
  const startY = useRef(0);
  const dragDistance = useRef(0);

  const totalCards = galleryImages.length;
  const cardHeightStep = 280; 

  const currentY = useRef(0);
  const targetY = useRef(0);
  const minScroll = useRef(0);
  const maxScroll = useRef(0);

  useEffect(() => {
    const updateBounds = () => {
      maxScroll.current = 0;
      minScroll.current = -((totalCards - 1) * cardHeightStep);
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);

    // ── Boundary Release Scroll Handler ──────────────────────────────────
    const stageEl = stageRef.current;
    const handleNativeWheel = (e: WheelEvent) => {
      const isAtTop = targetY.current >= maxScroll.current && e.deltaY < 0;
      const isAtBottom = targetY.current <= minScroll.current && e.deltaY > 0;

      // Only lock and intercept wheel if inside the active scroll range
      if (!isAtTop && !isAtBottom) {
        e.preventDefault();
        targetY.current = Math.max(minScroll.current, Math.min(maxScroll.current, targetY.current - e.deltaY * 0.85));
      }
    };

    if (stageEl) {
      stageEl.addEventListener('wheel', handleNativeWheel, { passive: false });
    }

    let animationFrameId: number;

    const renderLoop = () => {
      currentY.current += (targetY.current - currentY.current) * 0.085;

      if (trackRef.current) {
        gsap.set(trackRef.current, { y: currentY.current });

        const cards = trackRef.current.querySelectorAll('.helix-card');
        const stageCenter = 340;
        let closestIdx = 0;
        let minDistance = Infinity;

        cards.forEach((card, index) => {
          const rect = card.getBoundingClientRect();
          const parentRect = trackRef.current?.parentElement?.getBoundingClientRect();

          if (parentRect) {
            const cardCenter = rect.top - parentRect.top + rect.height / 2;
            const distFromCenter = (cardCenter - stageCenter) / stageCenter;
            const absDist = Math.abs(distFromCenter);

            if (absDist < minDistance) {
              minDistance = absDist;
              closestIdx = index;
            }

            const angleRad = distFromCenter * Math.PI * 0.85;
            
            const translateX = Math.sin(angleRad) * 160;
            const translateZ = gsap.utils.clamp(-400, 0, Math.cos(angleRad) * 120 - 120 - absDist * 180);
            
            const rotateY = gsap.utils.clamp(-35, 35, distFromCenter * -40);
            const rotateX = gsap.utils.clamp(-15, 15, distFromCenter * 15);

            const scale = gsap.utils.clamp(0.72, 1.08, 1.08 - absDist * 0.36);
            const opacity = gsap.utils.clamp(0.2, 1, 1 - absDist * 0.65);
            const zIndex = Math.round(100 - absDist * 50);

            gsap.set(card, {
              x: translateX,
              y: 0,
              z: translateZ,
              rotateY: rotateY,
              rotateX: rotateX,
              scale: scale,
              opacity: opacity,
              zIndex: zIndex,
              transformPerspective: 1200,
            });
          }
        });

        setActiveCardIndex(closestIdx);
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      window.removeEventListener('resize', updateBounds);
      if (stageEl) {
        stageEl.removeEventListener('wheel', handleNativeWheel);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [totalCards]);

  // Pointer Handlers for Touch & Mouse Drag
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragDistance.current = 0;
    startY.current = e.clientY - targetY.current;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    dragDistance.current += 1;
    const y = e.clientY - startY.current;
    
    // Boundary clamp during drag
    targetY.current = Math.max(minScroll.current, Math.min(maxScroll.current, y));
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handleCardSelect = (image: GalleryImage) => {
    if (dragDistance.current < 6) {
      setSelectedImage(image);
    }
  };

  // Stepper Controls
  const slideNext = () => {
    targetY.current = Math.max(minScroll.current, targetY.current - cardHeightStep);
  };

  const slidePrev = () => {
    targetY.current = Math.min(maxScroll.current, targetY.current + cardHeightStep);
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
      className="py-20 bg-secondary/30 overflow-hidden select-none relative min-h-[900px] flex flex-col justify-center"
      ref={containerRef}
    >
      <div className="container px-4 mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1 rounded-full bg-[var(--gfg-green)]/10 border border-[var(--gfg-green)]/20 text-[var(--gfg-green)] text-xs font-mono font-semibold">
            <Sparkles size={14} />
            <span>Vertical 3D Helix Stage</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3 tracking-tight">
            Chapter Gallery
          </h2>
          <p className="text-muted-foreground text-sm md:text-base flex items-center justify-center gap-2">
            <RotateCw size={16} className="text-[var(--gfg-green)] animate-spin" style={{ animationDuration: '10s' }} />
            Drag vertically or scroll wheel to twist through the 3D helical stack
          </p>
        </div>

        {/* Helical Stage Layout */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {/* 3D Stage Container (touch-pan-y allows normal page swipe once edges are hit) */}
          <div
            ref={stageRef}
            className="relative h-[680px] w-full max-w-4xl overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y flex justify-center [perspective:1400px]"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {/* Center Helix Shaft */}
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-[var(--gfg-green)]/40 to-transparent -translate-x-1/2 pointer-events-none" />

            <div
              ref={trackRef}
              className="flex flex-col gap-10 items-center w-full pt-[220px] pb-[220px] [transform-style:preserve-3d] will-change-transform"
            >
              {galleryImages.map((image, index) => {
                const isActive = index === activeCardIndex;
                return (
                  <div
                    key={image.id}
                    onClick={() => handleCardSelect(image)}
                    className={`helix-card group relative w-72 h-48 md:w-[460px] md:h-60 rounded-2xl border bg-card overflow-hidden shadow-2xl shrink-0 cursor-pointer transition-colors duration-300 will-change-transform ${
                      isActive
                        ? 'border-[var(--gfg-green)] shadow-[0_0_30px_rgba(40,167,69,0.3)]'
                        : 'border-border/80 hover:border-[var(--gfg-green)]/50'
                    }`}
                  >
                    <div className="relative w-full h-full overflow-hidden bg-muted/20">
                      <img
                        src={image.src}
                        alt={image.alt || image.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out pointer-events-none"
                      />

                      {/* Glass Overlay with Permanent Zoom Button */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end justify-between p-4 md:p-5 z-20 transition-opacity duration-300 opacity-90 group-hover:opacity-100">
                        <span className="text-xs md:text-sm font-semibold text-white truncate max-w-[75%] font-display">
                          {image.title}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(image);
                          }}
                          className="p-2 rounded-full bg-[var(--gfg-green)] text-[#04150a] shrink-0 shadow-md hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                          aria-label="Zoom image"
                        >
                          <Maximize2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stepper Controls */}
          <div className="flex md:flex-col gap-4 z-20">
            <button
              onClick={slidePrev}
              aria-label="Slide up"
              className="p-3.5 rounded-full bg-card border border-border text-foreground hover:border-[var(--gfg-green)] hover:text-[var(--gfg-green)] transition-all duration-200 active:scale-95 shadow-md cursor-pointer"
            >
              <ChevronUp size={20} />
            </button>
            <button
              onClick={slideNext}
              aria-label="Slide down"
              className="p-3.5 rounded-full bg-card border border-border text-foreground hover:border-[var(--gfg-green)] hover:text-[var(--gfg-green)] transition-all duration-200 active:scale-95 shadow-md cursor-pointer"
            >
              <ChevronDown size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          onClick={handleCloseLightbox}
        >
          <button
            onClick={handleCloseLightbox}
            aria-label="Close"
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-[var(--gfg-green)] hover:text-black transition-colors z-[10000] cursor-pointer"
          >
            <X size={20} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLightboxPrev();
            }}
            aria-label="Previous"
            className="absolute left-4 md:left-8 p-3 rounded-full bg-white/10 text-white hover:bg-[var(--gfg-green)] hover:text-black transition-colors z-[10000] cursor-pointer"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt || selectedImage.title}
              className="max-h-[75vh] w-auto object-contain rounded-xl shadow-2xl border border-white/10"
            />
            {selectedImage.title && (
              <p className="text-white/90 text-sm md:text-base font-semibold mt-4 text-center font-display">
                {selectedImage.title}
              </p>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLightboxNext();
            }}
            aria-label="Next"
            className="absolute right-4 md:right-8 p-3 rounded-full bg-white/10 text-white hover:bg-[var(--gfg-green)] hover:text-black transition-colors z-[10000] cursor-pointer"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </section>
  );
}