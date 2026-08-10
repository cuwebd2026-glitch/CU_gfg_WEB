import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Building2, Sparkles, Zap, Calendar, MapPin, Sparkle } from 'lucide-react';
import { heroContent, events, EventItem } from '@/data/content';
import { filterEvents } from '@/lib/events';
import TypingText from './TypingText';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  // Extract ONLY ongoing and upcoming events
  const ongoing = filterEvents(events, 'ongoing');
  const upcoming = filterEvents(events, 'upcoming');
  const upcomingEventsList: EventItem[] = [...ongoing, ...upcoming];

  // State to track which event is currently displayed in terminal
  const [eventIndex, setEventIndex] = useState(0);
  const [phase, setPhase] = useState<'title' | 'date' | 'venue' | 'pause' | 'blank'>('title');

  const currentEvent = upcomingEventsList[eventIndex % Math.max(1, upcomingEventsList.length)];

  useEffect(() => {
    if (upcomingEventsList.length === 0) return;

    let timer: ReturnType<typeof setTimeout>;

    if (phase === 'blank') {
      timer = setTimeout(() => {
        setEventIndex((prev) => (prev + 1) % upcomingEventsList.length);
        setPhase('title');
      }, 800);
    }

    return () => clearTimeout(timer);
  }, [phase, upcomingEventsList.length]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-6 md:pt-8"
    >
      {/* Background layer */}
      <motion.div className="absolute inset-0 -z-10 bg-background" style={{ y: bgY }}>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--gfg-green)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--gfg-green)]/5 rounded-full blur-3xl" />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(62,207,95,0.12) 0%, transparent 70%)' }}
        />

        <div
          className="absolute inset-0 opacity-[0.35] dark:opacity-[0.25]"
          style={{
            backgroundImage:
              'linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
          }}
        />

        <svg className="absolute inset-0 w-full h-full opacity-[0.03] mix-blend-overlay" aria-hidden="true">
          <filter id="hero-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-noise)" />
        </svg>
      </motion.div>

      <motion.div className="container pt-4 md:pt-6 pb-12 md:pb-20" style={{ y: contentY, opacity: contentOpacity }}>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between h-full"
          >
            <div>
              {/* Reduced margin-bottom on top badges to shift content slightly higher */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-3 rounded-full border border-[var(--gfg-green)]/30 bg-[var(--gfg-green)]/10 text-sm shadow-[var(--shadow-elevation-low)]">
                <Building2 size={16} className="text-[var(--gfg-green)]" />
                <span className="font-medium text-foreground">{heroContent.affiliation}</span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[var(--gfg-green)] shadow-lg shadow-[var(--gfg-green)]/50" />
                <span className="text-xs font-mono text-[var(--gfg-green)] uppercase tracking-wider font-semibold">
                  {heroContent.eyebrow}
                </span>
              </div>

              {/* Fixed min-height to 3.6em / 3.8em so 3-line typing phrases fit perfectly without moving the layout */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-[1.1] text-foreground min-h-[3.6em] md:min-h-[3.8em] flex items-center">
                <TypingText
                  phrases={heroContent.typingPhrases}
                  className="text-gradient-brand"
                />
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                {heroContent.description}
              </p>

              <div className="max-w-2xl mb-8 surface-card p-4 sm:p-5 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--gfg-green)]/15 text-[var(--gfg-green)] flex items-center justify-center shrink-0">
                  <Sparkles size={18} />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{heroContent.universityTagline}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    A campus-wide community uniting student developers, speakers, and innovators under one roof.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Block */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border/40 mt-auto">
              {heroContent.stats.map(([value, label]) => (
                <div key={label}>
                  <div className="text-2xl md:text-3xl font-display font-bold text-[var(--gfg-green)]">{value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-between h-full space-y-5"
          >
            {/* Event Terminal Window */}
            <div className="bg-[#0c0e12] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
              {/* Terminal Header Bar */}
              <div className="bg-[#15181e] px-4 py-3 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-3 text-xs text-gray-400 font-mono tracking-wide">
                    events-stream.sh
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--gfg-green)] bg-[var(--gfg-green)]/10 px-2.5 py-0.5 rounded-full border border-[var(--gfg-green)]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--gfg-green)] animate-ping" />
                  UPCOMING
                </div>
              </div>

              {/* Terminal Screen Body */}
              <div className="p-6 font-mono text-sm min-h-[220px] flex flex-col justify-center bg-[#08090c]">
                {upcomingEventsList.length > 0 && currentEvent ? (
                  phase !== 'blank' ? (
                    <div className="space-y-4">
                      {/* Line 1: Event Name */}
                      <div className="flex items-start gap-2">
                        <Sparkle size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-gray-500 text-xs block uppercase tracking-wider">Event Name</span>
                          <span className="text-cyan-300 font-sans font-bold text-lg md:text-xl tracking-wide drop-shadow-[0_0_8px_rgba(103,232,249,0.3)]">
                            <TypingText
                              phrases={[currentEvent.title]}
                              typingSpeedMs={40}
                              pauseMs={1200}
                              onComplete={() => phase === 'title' && setPhase('date')}
                            />
                          </span>
                        </div>
                      </div>

                      {/* Line 2: Date */}
                      {(phase === 'date' || phase === 'venue' || phase === 'pause') && (
                        <div className="flex items-start gap-2">
                          <Calendar size={16} className="text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-gray-500 text-xs block uppercase tracking-wider">Date & Time</span>
                            <span className="text-amber-300 font-serif font-medium text-base tracking-wide">
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

                      {/* Line 3: Venue */}
                      {(phase === 'venue' || phase === 'pause') && (
                        <div className="flex items-start gap-2">
                          <MapPin size={16} className="text-[var(--gfg-green)] shrink-0 mt-0.5" />
                          <div>
                            <span className="text-gray-500 text-xs block uppercase tracking-wider">Venue</span>
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
                    /* Blank transition state between events */
                    <div className="text-gray-600 text-xs italic font-mono flex items-center justify-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-pulse" />
                      Fetching next event...
                    </div>
                  )
                ) : (
                  /* Fallback if no upcoming events */
                  <div className="text-center py-6 text-gray-500">
                    <p className="text-xs uppercase tracking-widest text-gray-400">Status</p>
                    <p className="text-sm font-sans mt-1 text-gray-300">No upcoming events scheduled.</p>
                    <p className="text-xs mt-2 text-[var(--gfg-green)]">Check back soon for new announcements!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Feature Badges Grid */}
            <div className="grid grid-cols-2 gap-4 my-auto py-2">
              {heroContent.badges.map((b) => (
                <div
                  key={b.title}
                  className="surface-card p-4 sm:p-5 flex flex-col justify-center hover:border-[var(--gfg-green)]/50 transition-colors"
                >
                  <div className="text-[var(--gfg-green)] font-bold text-sm sm:text-base flex items-center gap-2">
                    <span className="text-base sm:text-lg">{b.icon}</span>
                    <span>{b.title}</span>
                  </div>
                  <div className="text-muted-foreground text-xs sm:text-sm mt-1 leading-normal">{b.desc}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border/40 mt-auto">
              <motion.a
                href="/join"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 px-6 py-3.5 bg-[var(--gfg-green)] text-[#04150a] font-bold rounded-lg hover:bg-[var(--gfg-green-bright)] transition-colors flex items-center justify-center gap-2 group shadow-[var(--shadow-elevation-medium)] text-sm md:text-base"
              >
                Join Chapter
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="#events"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 px-6 py-3.5 border border-border text-foreground font-bold rounded-lg hover:border-[var(--gfg-green)] hover:text-[var(--gfg-green)] transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <Zap size={18} />
                Explore Events
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}