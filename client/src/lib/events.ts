import type { EventItem } from '@/data/content';

export type EventFilter = 'all' | 'upcoming' | 'ongoing' | 'past';

/**
 * Computes live status based on today's date vs event date:
 * - Same day -> 'ongoing'
 * - Future day -> 'upcoming'
 * - Past day -> 'past'
 */
export function getLiveStatus(event: EventItem): 'upcoming' | 'ongoing' | 'past' {
  const dateString = event.sortDate ?? event.date;
  const eventDate = new Date(dateString);

  if (Number.isNaN(eventDate.getTime())) {
    return (event.status?.toLowerCase() as 'upcoming' | 'ongoing' | 'past') || 'past';
  }

  const today = new Date();

  // Compare year, month, and day cleanly
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const eventStart = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate()).getTime();

  if (eventStart === todayStart) {
    return 'ongoing';
  }
  if (eventStart > todayStart) {
    return 'upcoming';
  }
  return 'past';
}

/**
 * Normalizes event object with its dynamic live status
 */
export function resolveEvent(event: EventItem): EventItem {
  return {
    ...event,
    status: getLiveStatus(event),
  };
}

const dateToTime = (event: EventItem) => {
  const time = new Date(event.sortDate ?? event.date).getTime();
  return Number.isNaN(time) ? null : time;
};

const compareDates = (a: EventItem, b: EventItem, direction: 1 | -1) => {
  const timeA = dateToTime(a);
  const timeB = dateToTime(b);

  if (timeA === null && timeB === null) return 0;
  if (timeA === null) return 1;
  if (timeB === null) return -1;
  return (timeA - timeB) * direction;
};

export function sortEvents(items: readonly EventItem[]): EventItem[] {
  const resolved = items.map(resolveEvent);

  const priority = { ongoing: 0, upcoming: 1, past: 2 };

  return resolved.sort((a, b) => {
    const statusA = a.status || 'past';
    const statusB = b.status || 'past';

    if (statusA !== statusB) {
      return priority[statusA] - priority[statusB];
    }

    return compareDates(a, b, statusA === 'past' ? -1 : 1);
  });
}

export function filterEvents(items: readonly EventItem[], filter: EventFilter): EventFilter extends 'all' ? EventItem[] : EventItem[] {
  const sorted = sortEvents(items);
  if (filter === 'all') return sorted;
  return sorted.filter((event) => event.status === filter);
}

/**
 * Homepage logic:
 * Strictly returns AT MOST 2 cards.
 * - Fills with active (ongoing/upcoming) events first.
 * - If fewer than 2 active events exist, tops up the remaining slot(s) with recent past events.
 */
export function getHomepageEvents(items: readonly EventItem[]): EventItem[] {
  const sorted = sortEvents(items);
  
  const activeEvents = sorted.filter((e) => e.status === 'ongoing' || e.status === 'upcoming');
  const pastEvents = sorted.filter((e) => e.status === 'past');

  // If we have 2 or more active events, return top 2 active
  if (activeEvents.length >= 2) {
    return activeEvents.slice(0, 2);
  }

  // If we have 1 active event, return 1 active + 1 most recent past event
  if (activeEvents.length === 1) {
    return [...activeEvents, ...pastEvents.slice(0, 1)];
  }

  // If we have 0 active events, return top 2 recent past events
  return pastEvents.slice(0, 2);
}