import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface AnimatedProgressBarProps {
  duration?: number;
  color?: string;
  height?: number;
  showLabel?: boolean;
}

/**
 * AnimatedProgressBar Component
 * 
 * Smooth progress animation on component mount with customizable duration and styling.
 * Respects prefers-reduced-motion for accessibility.
 * 
 * Features:
 * - Smooth fill animation from 0 to 100%
 * - Customizable duration, color, and height
 * - Optional percentage label
 * - Accessibility support (prefers-reduced-motion)
 */
export default function AnimatedProgressBar({
  duration = 3,
  color = '#3ecf5f',
  height = 4,
  showLabel = true,
}: AnimatedProgressBarProps) {
  const [progress, setProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setProgress(100);
      return;
    }

    const startTime = Date.now();
    const durationMs = duration * 1000;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / durationMs) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [duration, prefersReducedMotion]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-400">Loading</span>
        {showLabel && (
          <span className="text-sm font-semibold" style={{ color }}>
            {Math.round(progress)}%
          </span>
        )}
      </div>
      <div className="w-full bg-gray-800 rounded-full overflow-hidden" style={{ height: `${height}px` }}>
        <motion.div
          className="h-full rounded-full"
          style={{ 
            backgroundColor: color,
            width: `${progress}%`,
          }}
          animate={{
            boxShadow: progress > 0 ? `0 0 20px ${color}40` : 'none',
          }}
          transition={{
            boxShadow: { duration: 0.3 },
          }}
        />
      </div>
    </div>
  );
}
