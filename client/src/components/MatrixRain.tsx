'use client';
import { useEffect, useRef } from 'react';

interface MatrixRainProps {
  className?: string;
}

export default function MatrixRain({ className = '' }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Use alpha: true so canvas stays transparent — page CSS bg shows through
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const FONT_SIZE = 13;
    const CHARS = '01{}[]<>=/\\|*&^%$#@!;:,.?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const TECH_WORDS = ['GFG','CSS','API','SQL','AI','ML','JS','DSA','CPU','RAM','GPU','if','for','&&','||','=>','++','const','let','null','void','new'];

    let drops: number[] = [];
    let raf: number;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const cols = Math.floor(canvas.width / FONT_SIZE);
      drops = Array.from({ length: cols }, () =>
        Math.floor(Math.random() * (canvas.height / FONT_SIZE))
      );
      // Clear to transparent on resize
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const draw = () => {
      // Fade existing characters using destination-out (erases to transparent)
      // This keeps the canvas transparent so the CSS bg transitions smoothly
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.10)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw new characters in normal mode
      ctx.globalCompositeOperation = 'source-over';
      ctx.font = `${FONT_SIZE}px 'Courier New', monospace`;

      const isDark = document.documentElement.classList.contains('dark');
      const cols = drops.length;

      for (let i = 0; i < cols; i++) {
        const usesWord = Math.random() > 0.85;
        const char = usesWord
          ? TECH_WORDS[Math.floor(Math.random() * TECH_WORDS.length)]
          : CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;

        const isHead = Math.random() > 0.9;
        // Green in both themes — brighter in dark, subtler in light
        ctx.fillStyle = isDark
          ? isHead
            ? `rgba(80, 200, 100, ${0.5 + Math.random() * 0.2})`
            : `rgba(34, 150, 55, ${0.2 + Math.random() * 0.15})`
          : isHead
            ? `rgba(30, 140, 55, ${0.6 + Math.random() * 0.2})`
            : `rgba(40, 120, 50, ${0.22 + Math.random() * 0.13})`;

        ctx.fillText(char, x, y);

        if (drops[i] * FONT_SIZE > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.55 + Math.random() * 0.35;
      }

      raf = requestAnimationFrame(draw);
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`block ${className}`}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
}