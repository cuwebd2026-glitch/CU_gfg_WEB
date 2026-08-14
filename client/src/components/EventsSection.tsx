import { useEffect } from 'react';
import { ArrowRight, CalendarDays } from 'lucide-react';
import EventCard from '@/components/EventCard';
import { events } from '@/data/content';
import { getHomepageEvents } from '@/lib/events';
import { fadeUpOnScroll } from '@/lib/animations';
import LogoChaseBackground from '@/components/LogoChaseBackground';

export default function EventsSection() {
  const previewEvents = getHomepageEvents(events);
  const hasUpcoming = previewEvents.some((e) => e.status?.toLowerCase() === 'upcoming');

  useEffect(() => {
    let ctxHeader = fadeUpOnScroll('.events-header', 0.15, '#events');
    let ctxCards = fadeUpOnScroll('.event-card-anim', 0.15, '#events');
    return () => {
      if (ctxHeader) ctxHeader.revert();
      if (ctxCards) ctxCards.revert();
    };
  }, []);

  return (
    <section id="events" className="relative py-20 md:py-32 overflow-hidden">
      {/* Team's Background Animation Component */}
      <LogoChaseBackground />

      <div className="container relative z-10 px-4 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 events-header opacity-0">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--gfg-green)]" />
            <span className="text-xs font-mono text-[var(--gfg-green)] uppercase tracking-wider font-semibold">
              Events & Competitions
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3">
            {hasUpcoming ? 'Upcoming Events' : 'Recent Chapter Events'}
          </h2>
          <p className="text-muted-foreground max-w-2xl text-base">
            {hasUpcoming
              ? 'Join our upcoming workshops, hackathons, and sessions.'
              : 'Explore verified events and competitions organized by GFG Student Chapter - CU.'}
          </p>
        </div>

        {/* Cards Grid (Strictly max 2 cards) */}
        {previewEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {previewEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 surface-card rounded-2xl border border-border">
            <CalendarDays className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-foreground font-semibold">No events scheduled right now.</p>
            <p className="text-sm text-muted-foreground mt-1">Check back soon or explore past events!</p>
          </div>
        )}

        {/* Explore All Button */}
        <div className="flex justify-center mt-12">
          <a
            href="/events"
            className="px-8 py-4 bg-[var(--gfg-green)] text-[#04150a] font-bold rounded-lg hover:bg-[var(--gfg-green-bright)] transition-all transform hover:scale-105 inline-flex items-center gap-2 group shadow-lg cursor-pointer"
          >
            Explore All Events
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}