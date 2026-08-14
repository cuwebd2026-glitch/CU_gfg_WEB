import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { achievements } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

const ITEMS = achievements.slice().reverse(); // oldest → newest

const PALETTE = [
  { color: '#22c55e' },
  { color: '#6366f1' },
  { color: '#a855f7' },
  { color: '#f59e0b' },
];

export default function AchievementsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<SVGPathElement>(null);
  const dotRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  // Responsive state for geometry
  const [isMobile, setIsMobile] = useState(false);
  const [viewportW, setViewportW] = useState(1000);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setViewportW(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Geometry changes based on screen size
  const SVG_W = isMobile ? 1600 : 2000;
  const SVG_H = isMobile ? 220 : 320;
  const MID   = SVG_H / 2;
  const AMP   = isMobile ? 55 : 100; // Flatter curves on mobile
  const CP    = isMobile ? 120 : 200;

  // Add padding at the start so the first card is centered (especially on mobile)
  const padX = isMobile ? SVG_W * 0.2 : SVG_W * 0.125;
  const availW = SVG_W - padX * 2;
  const spacing = availW / 3;
  
  const PTS = [
    { x: padX, y: MID + AMP }, // bottom
    { x: padX + spacing, y: MID - AMP }, // top
    { x: padX + spacing * 2, y: MID + AMP }, // bottom
    { x: padX + spacing * 3, y: MID - AMP }, // top
  ];

  const TOP = [true, false, true, false]; // valley -> card above, peak -> card below

  const wavePath =
    `M ${PTS[0].x} ${PTS[0].y}` +
    ` C ${PTS[0].x + CP} ${PTS[0].y}, ${PTS[1].x - CP} ${PTS[1].y}, ${PTS[1].x} ${PTS[1].y}` +
    ` C ${PTS[1].x + CP} ${PTS[1].y}, ${PTS[2].x - CP} ${PTS[2].y}, ${PTS[2].x} ${PTS[2].y}` +
    ` C ${PTS[2].x + CP} ${PTS[2].y}, ${PTS[3].x - CP} ${PTS[3].y}, ${PTS[3].x} ${PTS[3].y}`;

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = sectionRef.current;
    const track = trackRef.current;
    const line  = lineRef.current;
    if (!section || !track || !line) return;

    let ctx = gsap.context(() => {
      // Header reveal
      const hdrs = section.querySelectorAll('.ach-hdr');
      gsap.set(hdrs, { opacity: 0, y: 20 });
      gsap.to(hdrs, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.13, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 80%', once: true },
      });

      const len = line.getTotalLength();
      gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
      dotRefs.current.forEach(d => d && gsap.set(d, { scale: 0, opacity: 0 }));
      cardRefs.current.forEach(c => c && gsap.set(c, { opacity: 0, y: TOP[cardRefs.current.indexOf(c)] ? -20 : 20 }));

      if (reduced) {
        gsap.set(line, { strokeDashoffset: 0 });
        dotRefs.current.forEach(d => d && gsap.set(d, { scale: 1, opacity: 1 }));
        cardRefs.current.forEach(c => c && gsap.set(c, { opacity: 1, y: 0 }));
        return;
      }

      const scrollDistance = track.scrollWidth - viewportW;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: true,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: -1,
        },
      });

      // Move track left
      tl.to(track, {
        x: () => -scrollDistance,
        ease: 'none',
        duration: 4
      }, 0);

      // Draw wave
      tl.to(line, { strokeDashoffset: 0, ease: 'none', duration: 4 }, 0);

      // Reveal dots and cards
      PTS.forEach((pt, i) => {
        const ptPixelX = (pt.x / SVG_W) * track.scrollWidth;
        let triggerProgress = (ptPixelX - viewportW / 2) / scrollDistance;
        
        let t = triggerProgress * 4;
        if (t < 0.1) t = 0.1;
        if (t > 3.8) t = 3.8;
        
        const dot  = dotRefs.current[i];
        const card = cardRefs.current[i];
        
        if (dot) {
          tl.to(dot, { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(2)' }, t - 0.15);
        }
        if (card) {
          tl.to(card, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, t);
        }
      });

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, [SVG_W, SVG_H, AMP, CP, viewportW]);

  return (
    <section 
      id="achievements" 
      ref={sectionRef} 
      className="relative w-full h-[100dvh] overflow-hidden bg-secondary/40"
      style={{ minHeight: isMobile ? '550px' : '650px' }}
    >
      <div className="relative w-full h-full flex flex-col">
        {/* Header */}
        <div className="shrink-0 pt-10 md:pt-12 pb-2 md:pb-4 text-center px-6 z-10 relative">
          <div className="ach-hdr flex items-center justify-center gap-2 mb-2">
            <span className="block w-8 h-px bg-[var(--gfg-green)]/50" />
            <span className="text-xs font-mono text-[var(--gfg-green)] uppercase tracking-widest">Milestones</span>
            <span className="block w-8 h-px bg-[var(--gfg-green)]/50" />
          </div>
          <h2 className="ach-hdr text-3xl md:text-5xl font-display font-extrabold text-foreground tracking-tight">
            Our Journey <span className="text-[var(--gfg-green)]">So Far</span>
          </h2>
          <p className="ach-hdr text-xs md:text-sm text-muted-foreground mt-2">
            Scroll to explore each milestone →
          </p>
        </div>

        {/* Track */}
        <div className="flex-1 relative">
          <div
            ref={trackRef}
            className="absolute top-0 left-0 bottom-0"
            style={{ width: isMobile ? '250vw' : '200vw' }}
          >
            {/* Wave SVG */}
            <svg
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
            >
              <path d={wavePath} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
              <path
                ref={lineRef}
                d={wavePath}
                fill="none"
                stroke="var(--gfg-green)"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.7"
              />
            </svg>

            {/* HTML Dots and Cards */}
            {PTS.map((pt, i) => {
              const isTop = TOP[i];
              const leftPct = (pt.x / SVG_W) * 100;
              const topPct  = (pt.y / SVG_H) * 100;
              
              const yOffset = isMobile 
                ? (isTop ? 220 : -10)
                : (isTop ? 260 : -30);
                
              const connHeight = isMobile ? 35 : 55;

              return (
                <div key={i}>
                  {/* HTML Dot */}
                  <div
                    ref={el => { dotRefs.current[i] = el; }}
                    className="absolute flex items-center justify-center pointer-events-none"
                    style={{
                      left: `${leftPct}%`,
                      top: `${topPct}%`,
                      transform: 'translate(-50%, -50%)',
                      width: isMobile ? '36px' : '48px',
                      height: isMobile ? '36px' : '48px',
                    }}
                  >
                    <div className="absolute inset-0 rounded-full" style={{ background: PALETTE[i].color, opacity: 0.1 }} />
                    <div className="absolute rounded-full" style={{ width: '50%', height: '50%', background: PALETTE[i].color, opacity: 0.2 }} />
                    <div 
                      className="absolute rounded-full" 
                      style={{ 
                        width: '30%', height: '30%', 
                        background: PALETTE[i].color,
                        boxShadow: `0 0 10px ${PALETTE[i].color}`
                      }} 
                    />
                  </div>

                  {/* Terminal Card */}
                  <div
                    ref={el => { cardRefs.current[i] = el; }}
                    className="absolute"
                    style={{
                      left: `${leftPct}%`,
                      transform: 'translateX(-50%)',
                      top: isTop
                        ? `calc(${topPct}% - ${yOffset}px)`
                        : `calc(${topPct}% - ${yOffset}px)`,
                      width: isMobile ? '240px' : '260px',
                    }}
                  >
                    <TerminalCard item={ITEMS[i]} palette={PALETTE[i]} isMobile={isMobile} />

                    {/* Connector Line */}
                    <div
                      className="absolute left-1/2 -translate-x-px w-px"
                      style={{
                        height: `${connHeight}px`,
                        background: `linear-gradient(${isTop ? '180deg' : '0deg'}, ${PALETTE[i].color}55, transparent)`,
                        ...(isTop ? { bottom: `-${connHeight}px` } : { top: `-${connHeight}px` }),
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hint dots */}
        <div className="shrink-0 pb-6 md:pb-8 flex justify-center gap-2 z-10 relative">
          {PTS.map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{ background: PALETTE[i].color, opacity: 0.4 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TerminalCard({
  item,
  palette,
  isMobile
}: {
  item: typeof ITEMS[0];
  palette: { color: string };
  isMobile: boolean;
}) {
  return (
    <div
      className="rounded-xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
      style={{
        border: `1px solid ${palette.color}35`,
        boxShadow: `0 4px 24px ${palette.color}18`,
      }}
    >
      <div className="flex items-center gap-1.5 px-3 py-2" style={{ background: '#1a1a1a' }}>
        <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-red-500/80" />
        <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-yellow-400/80" />
        <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-500/80" />
        <span className="ml-2 text-[9px] md:text-[10px] font-mono text-white/25 tracking-wider truncate">
          milestone_{item.year}.log
        </span>
      </div>

      <div className="px-3 md:px-4 py-2.5 md:py-3 font-mono" style={{ background: '#111111' }}>
        <div className="flex items-center gap-1.5 mb-1.5 md:mb-2 text-[10px] md:text-[11px]">
          <span style={{ color: palette.color }}>❯</span>
          <span className="text-white/40">gfg-cu</span>
          <span style={{ color: palette.color }}>show</span>
        </div>

        <div
          className="text-xl md:text-2xl font-extrabold font-display tracking-tight mb-1 md:mb-1.5 leading-none"
          style={{ color: palette.color }}
        >
          {item.year}
        </div>

        <div className="flex items-center gap-1 mb-1.5 md:mb-2">
          <span style={{ color: palette.color }} className="text-[8px] md:text-[10px]">◆</span>
          <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold" style={{ color: palette.color }}>
            {item.metric}
          </span>
        </div>

        <div className="text-[12px] md:text-[13px] font-bold text-white/90 leading-snug mb-1">
          {item.title}
        </div>

        <div className="text-[10px] md:text-[11px] text-white/40 leading-relaxed line-clamp-3">
          {item.description}
        </div>

        <div className="mt-2 flex items-center gap-1">
          <span className="text-white/20 text-[9px] md:text-[10px]">$</span>
          <span
            className="inline-block w-1.5 h-2.5 md:h-3 ml-0.5 rounded-sm animate-pulse"
            style={{ background: palette.color, opacity: 0.55 }}
          />
        </div>
      </div>
    </div>
  );
}