import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import StatisticsSection from '@/components/StatisticsSection';
import AboutSection from '@/components/AboutSection';
import FeaturesSection from '@/components/FeaturesSection';
import EventsSection from '@/components/EventsSection';
import AchievementsSection from '@/components/AchievementsSection';
import SponsorsSection from '@/components/SponsorsSection';
import PartnersSection from '@/components/PartnersSection';
import GallerySection from '@/components/GallerySection';
import TestimonialsSection from '@/components/TestimonialsSection';
import TeamSection from '@/components/TeamSection';
import FacultyCoordinatorSection from '@/components/FacultyCoordinatorSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { motion } from 'motion/react';

/**
 * Home Page - GFG CU Community
 *
 * Section order: Navbar -> Hero -> Statistics -> About -> Features -> Events
 * -> Achievements -> Sponsors -> Partners -> Gallery -> Testimonials -> Team
 * -> Faculty Coordinator -> FAQ -> Contact -> Footer
 *
 * All section content is data-driven from `@/data/content.ts`.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Main Content */}
      <main>
        <HeroSection />
        <StatisticsSection />
        <AboutSection />
        <FeaturesSection />
        <EventsSection />
        <AchievementsSection />
        <SponsorsSection />
        <PartnersSection />
        <GallerySection />
        <TestimonialsSection />
        <TeamSection />
        <FacultyCoordinatorSection />
        <FAQSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Scroll-to-top Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-[var(--gfg-green)] text-[#04150a] rounded-full flex items-center justify-center font-bold hover:bg-[var(--gfg-green-bright)] transition-colors shadow-lg hover:shadow-[var(--gfg-green)]/50 z-50"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        ↑
      </motion.button>
    </div>
  );
}
