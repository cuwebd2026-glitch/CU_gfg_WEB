import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'motion/react';
import { aboutContent } from '@/data/content';
import { getIcon } from '@/lib/icon-map';
import { Code2, Terminal, Cpu, Network, Binary } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !wrap.current || !track.current) return;
    const ctx = gsap.context(() => {
      const distance = track.current!.scrollWidth - window.innerWidth;
      
      // Horizontal Pan
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
      
      tl.to(track.current, {
        x: -distance,
        ease: "none",
      });

      // Animate the Journey Line
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: "none",
        }, 0); 
      }

      // Parallax effect for background elements
      gsap.utils.toArray('.tech-node').forEach((node: any) => {
        const speed = parseFloat(node.dataset.speed || "1");
        const dir = parseFloat(node.dataset.dir || "1");
        
        tl.to(node, {
          x: distance * speed * dir * 0.3,
          ease: "none",
        }, 0);
      });
    }, wrap);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={wrap} id="about" className="relative overflow-hidden bg-background">
      
      {/* Subtle Matrix/Tech background grid */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, var(--gfg-green) 1px, transparent 1px), linear-gradient(to bottom, var(--gfg-green) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      />
      
      {/* Dynamic Modern Tech Background */}
      <div className="absolute inset-0 z-0 pointer-events-none hidden md:block overflow-hidden">
        
        {/* Giant Hollow Text Parallax (Moves in reverse) */}
        <div 
          className="absolute top-[15%] left-0 whitespace-nowrap opacity-[0.03] dark:opacity-[0.03] font-display font-black text-[25vw] leading-none tracking-tighter text-transparent tech-node" 
          style={{ WebkitTextStroke: '2px var(--foreground)' }}
          data-speed="1.5" 
          data-dir="-1"
        >
          CODE . CONNECT . CONQUER
        </div>
        <div 
          className="absolute top-[55%] left-[-50vw] whitespace-nowrap opacity-[0.02] dark:opacity-[0.02] font-display font-black text-[20vw] leading-none tracking-tighter text-transparent tech-node" 
          style={{ WebkitTextStroke: '2px var(--gfg-green)' }}
          data-speed="2" 
          data-dir="1"
        >
          INNOVATE . BUILD . LEARN
        </div>

        {/* Fiber Optic Circuit Traces (Horizontal) */}
        <div className="absolute top-[30%] left-[-100vw] w-[400vw] h-[1px] bg-gradient-to-r from-transparent via-[var(--gfg-green)] to-transparent opacity-30 tech-node drop-shadow-[0_0_8px_rgba(47,141,70,0.8)]" data-speed="0.5" data-dir="1"></div>
        <div className="absolute top-[65%] left-0 w-[500vw] h-[2px] bg-gradient-to-r from-transparent via-[var(--gfg-green)] to-transparent opacity-20 tech-node" data-speed="1.2" data-dir="-1"></div>
        <div className="absolute top-[85%] left-[-50vw] w-[300vw] h-[1px] bg-gradient-to-r from-transparent via-[var(--gfg-green)] to-transparent opacity-40 tech-node" data-speed="0.8" data-dir="1"></div>
        
        {/* Scanning Laser Lines (Vertical) */}
        <div className="absolute top-0 bottom-0 left-[30vw] w-[1px] bg-gradient-to-b from-transparent via-[var(--gfg-green)] to-transparent opacity-40 tech-node" data-speed="0.4" data-dir="1"></div>
        <div className="absolute top-0 bottom-0 left-[120vw] w-[2px] bg-gradient-to-b from-transparent via-[var(--gfg-green)] to-transparent opacity-20 tech-node drop-shadow-[0_0_12px_rgba(47,141,70,1)]" data-speed="1.1" data-dir="-1"></div>

        {/* Floating Tech Elements scattered around */}
        <div className="absolute top-[30%] left-[45vw] text-[var(--gfg-green)]/30 tech-node drop-shadow-[0_0_10px_rgba(47,141,70,0.5)]" data-speed="1.8" data-dir="1">
          <Code2 size={40} strokeWidth={1.5} />
        </div>
        <div className="absolute top-[15%] left-[80vw] text-[var(--gfg-green)]/20 tech-node" data-speed="0.6" data-dir="-1">
          <Terminal size={32} strokeWidth={1.5} />
        </div>
        <div className="absolute top-[80%] left-[110vw] text-[var(--gfg-green)]/30 tech-node drop-shadow-[0_0_10px_rgba(47,141,70,0.5)]" data-speed="1.3" data-dir="1">
          <Cpu size={48} strokeWidth={1.5} />
        </div>
        <div className="absolute top-[25%] left-[150vw] text-[var(--gfg-green)]/20 tech-node" data-speed="0.9" data-dir="-1">
          <Network size={36} strokeWidth={1.5} />
        </div>
        <div className="absolute top-[70%] left-[200vw] text-[var(--gfg-green)]/30 tech-node drop-shadow-[0_0_10px_rgba(47,141,70,0.5)]" data-speed="1.6" data-dir="1">
          <Binary size={40} strokeWidth={1.5} />
        </div>
      </div>

      <div ref={track} className="flex h-[100dvh] items-center pt-16 relative z-10">
        
        {/* Panel 1: Narrative */}
        <div className="w-[100vw] shrink-0 flex items-center px-6 md:px-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-[var(--gfg-green)]" />
              <span className="text-xs font-mono text-[var(--gfg-green)] uppercase tracking-widest">
                {aboutContent.eyebrow}
              </span>
            </div>
            {/* Enlarged Font Sizes */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
              {aboutContent.title}
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-[55ch]">
              {aboutContent.description}
            </p>
          </div>
        </div>

        {/* Panels 2+: Pillar Cards */}
        {aboutContent.pillars.map((pillar) => {
          const Icon = getIcon(pillar.icon);
          return (
            <div key={pillar.id} className="w-[85vw] md:w-[45vw] lg:w-[35vw] shrink-0 px-4 md:px-8">
              <div className="surface-card p-10 md:p-12 h-[55vh] flex flex-col justify-between hover:border-[var(--gfg-green)]/40 transition-all duration-500 hover:-translate-y-2 group">
                <div className="w-16 h-16 rounded-sm border border-[var(--gfg-green)]/30 bg-[var(--gfg-green)]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Icon size={32} className="text-[var(--gfg-green)] drop-shadow-[0_0_12px_rgba(47,141,70,0.4)]" />
                </div>
                <div>
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">{pillar.title}</h3>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            </div>
          );
        })}

        {/* End Padding to allow the last card to reach the center of the screen */}
        <div className="w-[30vw] shrink-0" />
      </div>
    </section>
  );
}
