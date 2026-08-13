import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import type { EventItem } from '@/data/content';

interface EventCardProps {
  event: EventItem;
  index: number;
}

export default function EventCard({ event, index }: EventCardProps) {
  const isRegistrationOpen = event.status === 'upcoming' || event.status === 'ongoing';

  return (
    <article
      className="surface-card overflow-hidden group hover:border-[var(--gfg-green)]/50 w-full rounded-xl border border-border flex flex-col justify-between event-card-anim"
    >
      <div>
        {/* Card Image Banner */}
        <div className="relative h-64 md:h-80 overflow-hidden bg-muted/10">
          <img
            src={event.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover blur-md opacity-30 scale-105 pointer-events-none"
          />
          <img
            src={event.image}
            alt={event.title}
            loading="lazy"
            className="relative w-full h-full object-contain z-10 transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <span
            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold z-20 shadow-md ${
              event.status === 'ongoing'
                ? 'bg-amber-500 text-black animate-pulse'
                : event.status === 'upcoming'
                ? 'bg-[var(--gfg-green)] text-[#04150a]'
                : 'bg-black/70 text-white backdrop-blur-sm'
            }`}
          >
            {event.status === 'ongoing' ? '⚡ Live Today' : event.status === 'upcoming' ? 'Upcoming' : 'Past'}
          </span>
        </div>

        {/* Card Body */}
        <div className="p-5">
          <span className="text-xs font-mono text-[var(--gfg-green)] uppercase tracking-wider font-semibold">
            {event.category}
          </span>
          <h3 className="font-display font-bold text-xl text-foreground mt-1 mb-2">{event.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 whitespace-pre-line">{event.description}</p>
          <div className="mt-4 pt-4 border-t border-border/50 space-y-2 text-xs text-muted-foreground">
            {event.speaker && <EventDetail label="Speaker" value={event.speaker} />}
            {event.designation && <EventDetail label="Designation" value={event.designation} />}
            {event.organizedBy && <EventDetail label="Organised by" value={event.organizedBy} />}
            <div className="flex items-center gap-1.5">
              <Bullet />
              <Calendar size={14} className="text-[var(--gfg-green)] shrink-0" />
              <span>
                <span className="font-semibold text-foreground">Date:</span> {event.date}
              </span>
            </div>
            {event.time && <EventDetail label="Time" value={event.time} />}
            {event.teamSize && <EventDetail label="Team Size" value={event.teamSize} />}
            <div className="flex items-center gap-1.5">
              <Bullet />
              <MapPin size={14} className="text-[var(--gfg-green)] shrink-0" />
              <span>
                <span className="font-semibold text-foreground">Venue:</span> {event.location}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Registration CTA Footer - Only rendered for open registrations */}
      {isRegistrationOpen && (
        <div className="p-5 pt-0 mt-2">
          <a
            href={event.registrationLink || '/join'}
            target={event.registrationLink ? '_blank' : '_self'}
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-[var(--gfg-green)] hover:bg-[var(--gfg-green-bright)] text-[#04150a] font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group/btn shadow-md hover:shadow-[var(--gfg-green)]/30 hover:scale-[1.01]"
          >
            <span>Register Now</span>
            <ExternalLink size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      )}
    </article>
  );
}

function Bullet() {
  return <span className="text-[var(--gfg-green)] font-bold">•</span>;
}

function EventDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <Bullet />
      <span>
        <span className="font-semibold text-foreground">{label}:</span> {value}
      </span>
    </div>
  );
}