import React, { useEffect, useRef } from "react";

interface CanvasTextProps {
  text: string;
  className?: string;
  backgroundClassName?: string;
  colors?: string[];
  lineGap?: number;
  animationDuration?: number;
}

/**
 * Canvas Text Component
 * 
 * Creates animated gradient text using HTML5 Canvas.
 * Features:
 * - Smooth color animations
 * - Customizable gradient colors
 * - Responsive sizing
 * - Configurable animation duration
 */
export const CanvasText: React.FC<CanvasTextProps> = ({
  text,
  className = "text-4xl font-bold",
  backgroundClassName = "bg-black dark:bg-neutral-700",
  colors = [
    "#3ecf5f",
    "#2f8d46",
    "#1b5e20",
    "#0d4620",
  ],
  lineGap = 6,
  animationDuration = 10,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = containerRef.current?.getBoundingClientRect();
      
      if (rect) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Extract font size from className
    let fontSize = 48;
    if (className.includes("text-2xl")) fontSize = 24;
    if (className.includes("text-3xl")) fontSize = 30;
    if (className.includes("text-4xl")) fontSize = 36;
    if (className.includes("text-5xl")) fontSize = 48;
    if (className.includes("text-6xl")) fontSize = 60;
    if (className.includes("lg:text-6xl")) fontSize = 60;
    if (className.includes("md:text-4xl")) fontSize = 36;

    const fontFamily = "Space Grotesk, Inter, sans-serif";
    const fontWeight = className.includes("font-bold") ? "bold" : "600";

    let animationProgress = 0;

    const animate = () => {
      animationProgress += 1 / (animationDuration * 60); // 60 FPS
      if (animationProgress > 1) animationProgress = 0;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw text with gradient
      ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const x = canvas.width / 2 / (window.devicePixelRatio || 1);
      const y = canvas.height / 2 / (window.devicePixelRatio || 1);

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);

      // Add color stops based on animation progress
      for (let i = 0; i < colors.length; i++) {
        const position = (animationProgress + i / colors.length) % 1;
        gradient.addColorStop(position, colors[i]);
      }

      ctx.fillStyle = gradient;
      ctx.fillText(text, x, y);

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [text, colors, animationDuration, className]);

  return (
    <div
      ref={containerRef}
      className={`flex items-center justify-center ${backgroundClassName} rounded-lg overflow-hidden`}
      style={{ minHeight: "200px" }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
      />
    </div>
  );
};
