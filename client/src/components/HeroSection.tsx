import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { animateHero } from '@/lib/animations';
import { ArrowRight, Zap, Calendar, MapPin, Sparkle } from 'lucide-react';
import { heroContent, events, EventItem } from '@/data/content';
import { filterEvents } from '@/lib/events';
import MatrixRain from './MatrixRain';
import TypingText from './TypingText';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // ── Hero entrance animation ──────────────────────────────
  useEffect(() => {
    const ctx = animateHero();
    return () => { if (ctx) ctx.revert(); };
  }, []);

  // ── Events for terminal ──────────────────────────────────
  const ongoing = filterEvents(events, 'ongoing');
  const upcoming = filterEvents(events, 'upcoming');
  const upcomingEventsList: EventItem[] = [...ongoing, ...upcoming];

  const [eventIndex, setEventIndex] = useState(0);
  const [phase, setPhase] = useState<'title' | 'date' | 'venue' | 'pause' | 'blank'>('title');
  const currentEvent = upcomingEventsList[eventIndex % Math.max(1, upcomingEventsList.length)];

  useEffect(() => {
    if (upcomingEventsList.length === 0) return;
    if (phase !== 'blank') return;
    const t = setTimeout(() => {
      setEventIndex(p => (p + 1) % upcomingEventsList.length);
      setPhase('title');
    }, 800);
    return () => clearTimeout(t);
  }, [phase, upcomingEventsList.length]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-[100dvh] flex items-center overflow-hidden pt-20 md:pt-0"
    >
      {/* ── Background layer: page colour ──────────────── */}
      <div className="absolute inset-0 -z-10 bg-background" />

      {/* ── Matrix Rain panel — right 52% ─────────────────── */}
      <div
        className="absolute top-0 right-0 h-full"
        style={{ width: '52%', zIndex: 0 }}
      >
        {/* Canvas renders only green chars on transparent bg — inherits page bg smoothly */}
        <MatrixRain className="absolute inset-0" />

        {/* Left-edge gradient fade into page background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, var(--background) 0%, transparent 40%)',
          }}
        />
      </div>

      {/* ── Content ─────────────────────────────────────── */}
      <motion.div className="container relative z-10 py-4">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center mt-4 md:-mt-24">

          {/* LEFT — copy + CTAs */}
          <div className="flex flex-col items-center text-center hero-anim opacity-0">

            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-4">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--gfg-green)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--gfg-green)]" />
              </span>
              <span className="text-[11px] font-mono text-[var(--gfg-green)] uppercase tracking-[0.2em] font-semibold">
                {heroContent.eyebrow}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-[3.2rem] font-display font-bold leading-[1.08] text-foreground min-h-[2.4em] md:min-h-[2.6em] flex items-start mb-5">
              <TypingText phrases={heroContent.typingPhrases} className="text-gradient-brand" />
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-muted-foreground max-w-[50ch] leading-relaxed mb-8">
              {heroContent.description}
            </p>

            {/* CTAs — centered */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center md:justify-center w-full mt-4">
              <motion.a
                href="/join"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5
                           bg-[var(--gfg-green)] text-[#04150a] font-bold rounded-lg
                           hover:bg-[var(--gfg-green-bright)] transition-colors
                           shadow-[0_0_28px_rgba(62,207,95,0.3)] text-sm md:text-base group"
              >
                Join Chapter
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href="#events"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5
                           border border-[var(--gfg-green)]/40 text-foreground font-bold rounded-lg
                           hover:border-[var(--gfg-green)] hover:text-[var(--gfg-green)]
                           hover:bg-[var(--gfg-green)]/5 transition-all text-sm md:text-base"
              >
                <Zap size={17} />
                Explore Events
              </motion.a>
            </div>
          </div>

          {/* RIGHT — Event Terminal */}
          <div className="flex flex-col hero-anim opacity-0">
            <div className="relative">
              {/* Terminal card — theme-aware */}
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm">
                {/* Terminal titlebar — theme-aware */}
                <div className="bg-muted px-4 py-3 flex items-center justify-between border-b border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="ml-3 text-xs text-gray-500 font-mono tracking-wide">events-stream.sh</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--gfg-green)] bg-[var(--gfg-green)]/10 px-2.5 py-1 rounded-full border border-[var(--gfg-green)]/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gfg-green)] animate-ping" />
                    UPCOMING
                  </div>
                </div>

                {/* Terminal body */}
                <div className="p-6 font-mono text-sm min-h-[200px] flex flex-col justify-center bg-card">
                  {upcomingEventsList.length > 0 && currentEvent ? (
                    phase !== 'blank' ? (
                      <div className="space-y-4">
                        <div className="flex items-start gap-2">
                          <Sparkle size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-gray-600 text-xs block uppercase tracking-wider">Event Name</span>
                            <span className="text-cyan-300 font-sans font-bold text-lg tracking-wide">
                              <TypingText
                                phrases={[currentEvent.title]}
                                typingSpeedMs={40}
                                pauseMs={1200}
                                onComplete={() => phase === 'title' && setPhase('date')}
                              />
                            </span>
                          </div>
                        </div>

                        {(phase === 'date' || phase === 'venue' || phase === 'pause') && (
                          <div className="flex items-start gap-2">
                            <Calendar size={16} className="text-amber-400 shrink-0 mt-0.5" />
                            <div>
                              <span className="text-gray-600 text-xs block uppercase tracking-wider">Date &amp; Time</span>
                              <span className="text-amber-300 font-medium text-base tracking-wide">
                                <TypingText
                                  phrases={[`${currentEvent.date}${currentEvent.time ? ` • ${currentEvent.time}` : ''}`]}
                                  typingSpeedMs={35}
                                  pauseMs={1200}
                                  onComplete={() => phase === 'date' && setPhase('venue')}
                                />
                              </span>
                            </div>
                          </div>
                        )}

                        {(phase === 'venue' || phase === 'pause') && (
                          <div className="flex items-start gap-2">
                            <MapPin size={16} className="text-[var(--gfg-green)] shrink-0 mt-0.5" />
                            <div>
                              <span className="text-gray-600 text-xs block uppercase tracking-wider">Venue</span>
                              <span className="text-[var(--gfg-green-bright)] font-mono text-sm tracking-wide">
                                <TypingText
                                  phrases={[currentEvent.location]}
                                  typingSpeedMs={35}
                                  pauseMs={2200}
                                  onComplete={() => {
                                    if (phase === 'venue') {
                                      setPhase('pause');
                                      setTimeout(() => setPhase('blank'), 2000);
                                    }
                                  }}
                                />
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-gray-600 text-xs italic font-mono flex items-center justify-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-pulse" />
                        Fetching next event...
                      </div>
                    )
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Status</p>
                      <p className="text-sm text-gray-400">No upcoming events scheduled.</p>
                      <p className="text-xs mt-2 text-[var(--gfg-green)]">Check back soon for new announcements!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}