import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Pause, Play, Linkedin, Quote } from 'lucide-react';
import { testimonials, TestimonialItem } from '@/data/content';

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const current: TestimonialItem = testimonials[activeIndex];

  useEffect(() => {
    if (!isAutoplay) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoplay]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 md:py-28 relative overflow-hidden">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-[var(--gfg-green)]" />
            <span className="text-xs font-mono text-[var(--gfg-green)] uppercase tracking-wider font-semibold">
              Leadership Voices
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Hear From Our Executive Board
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Meet the leaders driving the GFG CU Community forward. Their vision shapes our campus events, workshops, and developer culture.
          </p>
        </motion.div>

        {/* Main Testimonial Card Display */}
        <div className="relative surface-card border border-border rounded-2xl p-6 md:p-10 shadow-xl bg-background/60 backdrop-blur-md">
          <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-center">
            {/* Left Column: Prominent Profile Picture & Details */}
            <div className="md:col-span-5 flex flex-col items-center text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="relative group mb-4"
                >
                  {/* Photo Frame Container */}
                  <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60 rounded-2xl overflow-hidden border-2 border-[var(--gfg-green)]/40 shadow-lg bg-muted/20 relative">
                    <img
                      src={current.src}
                      alt={current.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Role Badge Overlay */}
                  <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[var(--gfg-green)] text-[#04150a] text-xs font-bold tracking-wide shadow-md whitespace-nowrap">
                    {current.designation}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Name & LinkedIn */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.name + '-info'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3"
                >
                  <h3 className="text-xl font-display font-bold text-foreground">{current.name}</h3>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">{current.designation} • GFG CU</p>

                  {current.linkedin && (
                    <a
                      href={current.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-md bg-[#0077b5]/10 hover:bg-[#0077b5]/20 text-[#0077b5] text-xs font-semibold transition-colors"
                    >
                      <Linkedin size={14} />
                      Connect on LinkedIn
                    </a>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Standardized Quote Box */}
            <div className="md:col-span-7 flex flex-col justify-between min-h-[220px] sm:min-h-[240px]">
              <div>
                <Quote size={36} className="text-[var(--gfg-green)]/30 mb-2 shrink-0" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.quote}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="min-h-[140px] flex items-center"
                  >
                    <blockquote className="text-base sm:text-lg text-foreground/90 font-serif leading-relaxed italic">
                      "{current.quote}"
                    </blockquote>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Controls Bar */}
              <div className="mt-6 pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-4">
                {/* Dots indicator */}
                <div className="flex items-center gap-2">
                  {testimonials.map((item, idx) => (
                    <button
                      key={item.name}
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === activeIndex
                          ? 'w-6 bg-[var(--gfg-green)]'
                          : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                      }`}
                    />
                  ))}
                </div>

                {/* Autoplay & Arrows Controls */}
                <div className="flex items-center gap-3 ml-auto">
                  {/* Autoplay Toggle Button */}
                  <button
                    onClick={() => setIsAutoplay((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/20 hover:bg-muted/40 text-xs font-mono text-muted-foreground transition-colors"
                    title={isAutoplay ? 'Pause slideshow' : 'Play slideshow'}
                  >
                    {isAutoplay ? (
                      <>
                        <Pause size={12} className="text-[var(--gfg-green)] animate-pulse" />
                        <span>Auto: ON</span>
                      </>
                    ) : (
                      <>
                        <Play size={12} className="text-muted-foreground" />
                        <span>Auto: OFF</span>
                      </>
                    )}
                  </button>

                  {/* Prev/Next Buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handlePrev}
                      aria-label="Previous testimonial"
                      className="p-2 rounded-lg border border-border hover:border-[var(--gfg-green)]/50 hover:bg-[var(--gfg-green)]/10 text-foreground transition-colors"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={handleNext}
                      aria-label="Next testimonial"
                      className="p-2 rounded-lg border border-border hover:border-[var(--gfg-green)]/50 hover:bg-[var(--gfg-green)]/10 text-foreground transition-colors"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
