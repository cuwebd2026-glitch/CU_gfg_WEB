import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon } from 'lucide-react';

import { useTheme } from '@/contexts/ThemeContext';
import { useLocation } from 'wouter';
import AnimatedToggle from './AnimatedToggle';
import { navItems } from '@/data/content';

export default function Header() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [location, setLocation] = useLocation();

  // Smooth scroll handler for anchor links
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (href.startsWith('#') || href.startsWith('/#')) {
      const targetId = href.replace('/#', '').replace('#', '');
      
      if (location !== '/') {
        window.location.href = '/#' + targetId;
      } else {
        const element = targetId === 'top' ? document.body : document.getElementById(targetId);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    } else {
      setLocation(href);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-all duration-300 ${isScrolled
          ? 'bg-background/90 border-border shadow-[var(--shadow-elevation-low)] py-2'
          : 'bg-background/60 border-transparent py-3'
        }`}
    >
      <div className="container flex items-center justify-between h-14 md:h-16 px-4 md:px-6">
        {/* Left Side Branding */}
        <motion.a
          href="#top"
          className="flex items-center gap-3 md:gap-4 group -ml-1 md:-ml-2 animate-in fade-in slide-in-from-left-4 duration-500 cursor-pointer"
        >
          {/* 1. CU Transformed Logo */}
          <img
            src="/cu-transformed.png?v=2"
            alt="Chandigarh University"
            loading="eager"
            className="h-8 md:h-10 w-auto object-contain shrink-0"
          />

          {/* Thin Vertical Divider */}
          <div className="h-8 w-px bg-border/60 shrink-0" aria-hidden="true" />

          <div className="relative h-32 md:h-48 w-auto overflow-hidden -mt-3 md:-mt-4 -ml-2 md:-ml-4">
            <img
              key={theme}
              src={theme === 'dark' ? '/gfgcu_light.png' : '/gfgcu_dark.png'}
              alt="GFG CU — GeeksforGeeks Student Chapter"
              loading="eager"
              decoding="async"
              className="h-32 md:h-48 w-auto object-contain"
            />
          </div>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href.startsWith('#') ? `/${item.href}` : item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="relative px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group cursor-pointer"
              whileTap={{ scale: 0.96 }}
            >
              {item.label}
              <span className="absolute left-3 right-3 -bottom-0.5 h-px bg-[var(--gfg-green)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
            </motion.a>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-border bg-secondary/70 px-3 py-1.5 text-xs text-muted-foreground shadow-[var(--shadow-elevation-low)]">
            <span className="inline-flex items-center gap-1.5 text-foreground font-medium">
              <span className="w-2 h-2 rounded-full bg-[var(--gfg-green)] animate-pulse" />
              GFG x CU
            </span>
          </div>

          <AnimatedToggle
            checked={theme === 'dark'}
            onChange={toggleTheme}
            variant="icon"
            icons={{
              on: <Moon size={14} />,
              off: <Sun size={14} />,
            }}
            size="md"
            label="Toggle dark mode"
          />

          {/* CTA Button */}
          <motion.a
            href="/join"
            onClick={(e) => handleNavClick(e, '/join')}
            className="hidden sm:inline-flex px-4 py-2 bg-[var(--gfg-green)] hover:bg-[var(--gfg-green-bright)] hover:scale-[1.03] text-[#04150a] text-sm font-semibold rounded-lg transition-all duration-200 shadow-sm cursor-pointer"
          >
            Join Now
          </motion.a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            className="md:hidden p-2 text-foreground rounded-md hover:bg-secondary active:scale-95 transition-all duration-200"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence initial={false}>
        {isMenuOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-background border-t border-border"
          >
            <nav className="flex flex-col gap-1 p-4">
              {navItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href.startsWith('#') ? `/${item.href}` : item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors cursor-pointer"
                  whileHover={{ x: 4 }}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="/join"
                onClick={(e) => handleNavClick(e, '/join')}
                className="mt-2 w-full text-center px-4 py-2.5 bg-[var(--gfg-green)] hover:bg-[var(--gfg-green-bright)] text-[#04150a] font-semibold rounded-lg transition-colors block cursor-pointer"
                whileTap={{ scale: 0.98 }}
              >
                Join Now
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}