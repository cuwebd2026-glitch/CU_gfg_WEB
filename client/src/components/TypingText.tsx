import { useEffect, useState } from 'react';

interface TypingTextProps {
  phrases: string[];
  typingSpeedMs?: number;
  deletingSpeedMs?: number;
  pauseMs?: number;
  className?: string;
}

/**
 * Cycles through a list of phrases with a typewriter effect.
 * Respects prefers-reduced-motion by simply showing the first phrase statically.
 */
export default function TypingText({
  phrases,
  typingSpeedMs = 45,
  deletingSpeedMs = 25,
  pauseMs = 1800,
  className = '',
}: TypingTextProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || phrases.length === 0) return;
    const current = phrases[phraseIndex % phrases.length];

    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeedMs);
    } else if (!isDeleting && text.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseMs);
    } else if (isDeleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deletingSpeedMs);
    } else if (isDeleting && text.length === 0) {
      setIsDeleting(false);
      setPhraseIndex((i) => (i + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex, phrases, typingSpeedMs, deletingSpeedMs, pauseMs, prefersReducedMotion]);

  const displayText = prefersReducedMotion ? phrases[0] : text;

  return (
    <span className={className}>
      {displayText}
      <span className="inline-block w-[2px] h-[0.9em] bg-[var(--gfg-green-bright)] ml-1 align-middle animate-pulse" aria-hidden="true" />
    </span>
  );
}
