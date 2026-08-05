import React, { useState, useRef, ReactNode } from "react";
import { motion } from "motion/react";

interface CardContainerProps {
  children: ReactNode;
  className?: string;
}

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

interface CardItemProps {
  as?: React.ElementType;
  children: ReactNode;
  className?: string;
  translateZ?: number;
  translateX?: number;
  translateY?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
}

/**
 * 3D Card Component
 * 
 * Creates a 3D perspective effect on hover using CSS transforms.
 * Features:
 * - Smooth 3D perspective transforms
 * - Individual item positioning with translateZ
 * - Hover-based rotation effects
 * - Responsive design
 */
export const CardContainer: React.FC<CardContainerProps> = ({
  children,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setMousePosition({ x, y });
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsMouseEnter(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsMouseEnter(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
      }}
      className={`flex justify-center items-center ${className}`}
    >
      <motion.div
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export const CardBody: React.FC<CardBodyProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border transition-all duration-300 ${className}`}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
};

export const CardItem: React.FC<CardItemProps> = ({
  as: Component = "div",
  children,
  className = "",
  translateZ = 0,
  translateX = 0,
  translateY = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
}) => {
  return (
    <motion.div
      style={{
        transformStyle: "preserve-3d",
        transform: `translateZ(${translateZ}px) translateX(${translateX}px) translateY(${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
      }}
      className={className}
    >
      {Component === "div" ? (
        <div>{children}</div>
      ) : Component === "button" ? (
        <button className={className}>{children}</button>
      ) : Component === "p" ? (
        <p className={className}>{children}</p>
      ) : (
        <Component className={className}>{children}</Component>
      )}
    </motion.div>
  );
};
