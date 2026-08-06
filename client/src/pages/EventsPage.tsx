import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import { events } from '@/data/content';
import { filterEvents } from '@/lib/events';

export default function EventsPage() {
  const upcomingEvents = filterEvents(events, 'upcoming');
  const pastEvents = filterEvents(events, 'past');

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-grow py-12">
        <div className="container">
          <a href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[var(--gfg-green)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gfg-green)] rounded-sm transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Home
          </a>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-14 md:mb-16">
            <div>
              <div className="flex items-center gap-2 mb-4"><div className="w-2 h-2 rounded-full bg-[var(--gfg-green)]" /><span className="text-xs font-mono text-[var(--gfg-green)] uppercase tracking-wider">Events</span></div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">Chapter Events</h1>
              <p className="text-muted-foreground max-w-2xl">Verified events and competitions organized by GFG Student Chapter - CU.</p>
            </div>
          </motion.div>

          <EventCollection
            title="Upcoming Events"
            description="Don't miss our upcoming workshops, hackathons, bootcamps, and community events."
            events={upcomingEvents}
          />
          <EventCollection
            title="Past Events"
            description="Explore some of the workshops, bootcamps, competitions, and technical sessions organized by GFG Student Chapter – CU."
            events={pastEvents}
            className="mt-20 md:mt-28"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

function EventCollection({
  title,
  description,
  events: collection,
  className = '',
}: {
  title: string;
  description: string;
  events: typeof events;
  className?: string;
}) {
  return (
    <section className={className} aria-labelledby={`${title.toLowerCase().replaceAll(' ', '-')}-heading`}>
      <div className="mb-8 md:mb-10">
        <h2 id={`${title.toLowerCase().replaceAll(' ', '-')}-heading`} className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
          {title}
        </h2>
        <p className="text-muted-foreground max-w-2xl">{description}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {collection.map((event, index) => <EventCard key={event.id} event={event} index={index} />)}
        </AnimatePresence>
      </div>
    </section>
  );
}
