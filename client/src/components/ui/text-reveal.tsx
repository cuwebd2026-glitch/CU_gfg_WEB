import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string | number;
  className?: string;
  delay?: number;
  stagger?: number;
  direction?: 'up' | 'right';
}

export function TextReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.05,
  direction = 'up',
}: TextRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      containerRef.current.querySelectorAll('.reveal-char').forEach((el: any) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const chars = Array.from(containerRef.current.querySelectorAll('.reveal-char'));
    if (!chars.length) return;

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(chars, direction === 'up' ? { opacity: 0, y: 40 } : { opacity: 0, x: 40 });

      gsap.to(chars, {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 0.55,
        stagger: stagger,
        ease: 'power2.out',
        delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 92%',
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, [delay, stagger, direction]);

  const textStr = String(text);

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {textStr.split('').map((char, index) => (
        <span
          key={index}
          className="reveal-char inline-block"
          style={{ 
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
