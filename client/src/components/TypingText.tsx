import { useEffect, useState } from 'react';

interface TypingTextProps {
  phrases: string[];
  typingSpeedMs?: number;
  deletingSpeedMs?: number;
  pauseMs?: number;
  className?: string;
  onComplete?: () => void;
}

export default function TypingText({
  phrases,
  typingSpeedMs = 120,
  deletingSpeedMs = 60,
  pauseMs = 2800,
  className = '',
  onComplete,
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
      if (onComplete) {
        onComplete();
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pauseMs);
      }
    } else if (isDeleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deletingSpeedMs);
    } else if (isDeleting && text.length === 0) {
      setIsDeleting(false);
      setPhraseIndex((i) => (i + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex, phrases, typingSpeedMs, deletingSpeedMs, pauseMs, prefersReducedMotion, onComplete]);

  const displayText = prefersReducedMotion ? phrases[0] : text;

  return (
    <span className={className}>
      {displayText}
      {text.length < (phrases[0]?.length || 0) && (
        <span className="inline-block w-[2px] h-[0.9em] bg-[var(--gfg-green-bright)] ml-1 align-middle animate-pulse" aria-hidden="true" />
      )}
    </span>
  );
}