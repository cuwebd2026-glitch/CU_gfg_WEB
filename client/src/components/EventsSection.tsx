import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import EventCard from '@/components/EventCard';
import { events } from '@/data/content';
import { getHomepageEvents } from '@/lib/events';

export default function EventsSection() {
  const previewEvents = getHomepageEvents(events);

  return (
    <section id="events" className="py-20 md:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[var(--gfg-green)]" />
            <span className="text-xs font-mono text-[var(--gfg-green)] uppercase tracking-wider">Events</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">Chapter Events</h2>
          <p className="text-muted-foreground max-w-2xl">Verified events and competitions organized by GFG Student Chapter - CU.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {previewEvents.map((event, index) => <EventCard key={event.id} event={event} index={index} />)}
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-10">
          <a
            href="/events"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--gfg-green)] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gfg-green)] focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-sm"
          >
            Explore All Events
            <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
