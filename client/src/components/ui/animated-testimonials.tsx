import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Linkedin } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
  linkedin?: string;
}

interface AnimatedTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  autoplayInterval?: number;
}

/**
 * Animated Testimonials Component
 * 
 * Beautiful carousel for displaying customer/user testimonials.
 * Features:
 * - Auto-rotating carousel
 * - Manual navigation with prev/next buttons
 * - Smooth fade and slide animations
 * - Responsive design
 * - LinkedIn profile links
 */
export const AnimatedTestimonials: React.FC<AnimatedTestimonialsProps> = ({
  testimonials,
  autoplay = true,
  autoplayInterval = 5000,
}) => {
  const [current, setCurrent] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(autoplay);

  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [isAutoplay, autoplayInterval, testimonials.length]);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
    setIsAutoplay(false);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoplay(false);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
    setIsAutoplay(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="relative bg-gray-800/50 border border-gray-700 rounded-lg p-8 md:p-12 min-h-96">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            {/* Quote */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg md:text-xl text-gray-300 mb-8 italic leading-relaxed max-w-2xl"
            >
              "{testimonials[current].quote}"
            </motion.p>

            {/* Profile Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col items-center gap-4"
            >
              {/* Avatar */}
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-green-500">
                <img
                  src={testimonials[current].src}
                  alt={testimonials[current].name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name and Designation */}
              <div>
                <h3 className="text-lg font-bold text-white">
                  {testimonials[current].name}
                </h3>
                <p className="text-sm text-gray-400">
                  {testimonials[current].designation}
                </p>
              </div>

              {/* LinkedIn Link */}
              {testimonials[current].linkedin && (
                <a
                  href={testimonials[current].linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-400 text-gray-900 font-semibold rounded-lg transition-colors"
                >
                  <Linkedin size={16} />
                  Connect on LinkedIn
                </a>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full bg-gray-700 hover:bg-green-500 text-white transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dot Indicators */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === current
                    ? "bg-green-500 w-8"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-gray-700 hover:bg-green-500 text-white transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Autoplay Toggle */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setIsAutoplay(!isAutoplay)}
            className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
              isAutoplay
                ? "bg-green-500 text-gray-900"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {isAutoplay ? "Autoplay ON" : "Autoplay OFF"}
          </button>
        </div>
      </div>
    </div>
  );
};
