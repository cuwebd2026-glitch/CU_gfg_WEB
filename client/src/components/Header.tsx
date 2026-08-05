import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
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
          className="flex items-center gap-2.5"
        >
          <div className="w-9 h-9 bg-gradient-to-br from-[var(--gfg-green)] to-[var(--gfg-green-bright)] rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-[#04150a] font-display font-bold text-lg">G</span>
          </div>
          <div className="leading-tight">
            <h1 className="font-display font-semibold text-foreground text-sm sm:text-base">GeeksforGeeks</h1>
            <p className="text-xs text-muted-foreground">Student Chapter</p>
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
            href="#contact"
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
                href="#contact"
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
