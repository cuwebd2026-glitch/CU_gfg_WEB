import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import AnimatedProgressBar from './AnimatedProgressBar';
import TypingText from './TypingText';
import { ArrowRight, Zap } from 'lucide-react';
import { heroContent } from '@/data/content';

export default function HeroSection() {
  const [showProgress, setShowProgress] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  useEffect(() => {
    const timer = setTimeout(() => setShowProgress(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background layer: spotlight + grid + noise, parallaxed on scroll */}
      <motion.div className="absolute inset-0 -z-10 bg-background" style={{ y: bgY }}>
        {/* Spotlight glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--gfg-green)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--gfg-green)]/5 rounded-full blur-3xl" />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(62,207,95,0.12) 0%, transparent 70%)' }}
        />

        {/* Grid texture */}
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

        {/* Noise texture for depth */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03] mix-blend-overlay" aria-hidden="true">
          <filter id="hero-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-noise)" />
        </svg>
      </motion.div>

      <motion.div className="container py-16 md:py-28" style={{ y: contentY, opacity: contentOpacity }}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-[var(--gfg-green)] shadow-lg shadow-[var(--gfg-green)]/50" />
              <span className="text-xs font-mono text-[var(--gfg-green)] uppercase tracking-wider">
                {heroContent.eyebrow}
              </span>
            </div>

            {/* Main Heading with typing animation */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-[1.1] text-foreground min-h-[2.2em] md:min-h-[2.4em]">
              <TypingText
                phrases={heroContent.typingPhrases}
                className="text-gradient-brand"
              />
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              {heroContent.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <motion.a
                href="/join"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-[var(--gfg-green)] text-[#04150a] font-bold rounded-lg hover:bg-[var(--gfg-green-bright)] transition-colors flex items-center justify-center gap-2 group shadow-[var(--shadow-elevation-medium)]"
              >
                Join the Chapter
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="#about"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 border border-border text-foreground font-bold rounded-lg hover:border-[var(--gfg-green)] hover:text-[var(--gfg-green)] transition-colors flex items-center justify-center gap-2"
              >
                <Zap size={20} />
                See What We Do
              </motion.a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              {heroContent.stats.map(([value, label]) => (
                <div key={label}>
                  <div className="text-3xl font-display font-bold text-[var(--gfg-green)]">{value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Terminal & Progress + Floating cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative space-y-6"
          >
            {/* Floating decorative card */}
            <motion.div
              className="hidden lg:block absolute -top-8 -right-6 surface-card px-4 py-3 z-10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: [0, -8, 0] }}
              transition={{ opacity: { duration: 0.6, delay: 0.5 }, y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
            >
              <div className="text-xs font-mono text-[var(--gfg-green)]">✓ PR #482 merged</div>
            </motion.div>
            <motion.div
              className="hidden lg:block absolute -bottom-6 -left-8 surface-card px-4 py-3 z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: [0, 8, 0] }}
              transition={{ opacity: { duration: 0.6, delay: 0.7 }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
            >
              <div className="text-xs font-mono text-[var(--gfg-green)]">🔥 12-day streak</div>
            </motion.div>

            {/* Terminal Window — intentionally always-dark, like a real terminal, in both themes */}
            <div className="bg-[#0d0f12] border border-white/10 rounded-lg overflow-hidden shadow-2xl">
              <div className="bg-[#16181c] px-4 py-3 flex items-center gap-2 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-xs text-gray-500 font-mono">gfg-student-chapter</span>
              </div>

              <div className="p-6 font-mono text-sm">
                <div className="text-gray-400">
                  <div>$ <span className="text-[var(--gfg-green-bright)]">npm run build</span></div>
                  <div className="mt-4 text-gray-500">Building your future...</div>
                </div>

                {showProgress && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-6"
                  >
                    <AnimatedProgressBar
                      duration={3}
                      color="#3ecf5f"
                      height={3}
                      showLabel={true}
                    />
                  </motion.div>
                )}

                {!showProgress && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 text-[var(--gfg-green-bright)]"
                  >
                    <div>✓ Build complete</div>
                    <div className="text-gray-500 mt-2">Ready to ship</div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Feature Badges */}
            <div className="grid grid-cols-2 gap-3">
              {heroContent.badges.map((b) => (
                <div
                  key={b.title}
                  className="surface-card p-4 hover:border-[var(--gfg-green)]/50"
                >
                  <div className="text-[var(--gfg-green)] font-bold text-sm">{b.icon} {b.title}</div>
                  <div className="text-muted-foreground text-xs mt-1">{b.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
