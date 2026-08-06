import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import AnimatedToggle from './AnimatedToggle';
import { navItems } from '@/data/content';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${
        isScrolled
          ? 'bg-background/90 border-border shadow-[var(--shadow-elevation-low)]'
          : 'bg-background/60 border-transparent'
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <motion.a
          href="#top"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="flex items-center gap-2 rounded-2xl border border-border bg-card/80 px-2.5 py-2 shadow-[var(--shadow-elevation-low)] backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white shadow-sm border border-border flex items-center justify-center shrink-0">
              {!logoFailed ? (
                <img
                  src="https://images.seeklogo.com/logo-png/43/1/chandigarh-university-cu-logo-png_seeklogo-432515.png"
                  alt="Chandigarh University logo"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover"
                  onError={() => setLogoFailed(true)}
                />
              ) : (
                <span className="text-[#04150a] font-display font-bold text-lg">CU</span>
              )}
            </div>
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white shadow-sm border border-border flex items-center justify-center shrink-0 p-1">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJjKYM-_45mBmWgs2JFiZmCSLsfvnjkr407f0Sp35KQWAMyyuE9MYIdB0&s=10"
                alt="GeeksforGeeks logo"
                referrerPolicy="no-referrer"
                loading="eager"
                decoding="async"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block leading-tight pr-1 border-l border-border pl-2">
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Chandigarh University</p>
              <p className="text-sm font-semibold text-foreground">GFG Community</p>
            </div>
          </div>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="relative px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              whileTap={{ scale: 0.96 }}
            >
              {item.label}
              <span className="absolute left-3 right-3 -bottom-0.5 h-px bg-[var(--gfg-green)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
            </motion.a>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-border bg-secondary/70 px-3 py-2 text-xs text-muted-foreground shadow-[var(--shadow-elevation-low)]">
            <span className="inline-flex items-center gap-1 text-foreground font-medium">
              <span className="w-2 h-2 rounded-full bg-[var(--gfg-green)]" />
              CU x GFG
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
            className="hidden sm:inline-flex px-4 py-2 bg-[var(--gfg-green)] hover:bg-[var(--gfg-green-bright)] text-[#04150a] text-sm font-semibold rounded-lg transition-colors"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Join Now
          </motion.a>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            className="md:hidden p-2 text-foreground rounded-md hover:bg-secondary transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
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
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                  whileHover={{ x: 4 }}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="/join"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 w-full text-center px-4 py-2.5 bg-[var(--gfg-green)] hover:bg-[var(--gfg-green-bright)] text-[#04150a] font-semibold rounded-lg transition-colors"
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
