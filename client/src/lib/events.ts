import type { EventItem } from '@/data/content';

export type EventFilter = 'all' | 'upcoming' | 'ongoing' | 'past';

function parseDate(dateStr?: string): number | null {
  if (!dateStr) return null;
  const isoMatch = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const [, y, m, d] = isoMatch;
    return new Date(Number(y), Number(m) - 1, Number(d)).getTime();
  }
  const timestamp = Date.parse(dateStr);
  return Number.isNaN(timestamp) ? null : timestamp;
}

export function getLiveStatus(event: EventItem): 'upcoming' | 'ongoing' | 'past' {
  // If status is hardcoded explicitly in content.ts, honor it unconditionally
  if (event.status) {
    return event.status.toLowerCase() as 'upcoming' | 'ongoing' | 'past';
  }

  const timestamp = parseDate(event.sortDate ?? event.date);
  if (!timestamp) return 'past';

  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

  if (timestamp === todayStart) return 'ongoing';
  if (timestamp > todayStart) return 'upcoming';
  return 'past';
}

export function resolveEvent(event: EventItem): EventItem {
  return {
    ...event,
    status: getLiveStatus(event),
  };
}

export function sortEvents(items: readonly EventItem[]): EventItem[] {
  const resolved = items.map(resolveEvent);
  const priority = { ongoing: 0, upcoming: 1, past: 2 };

  return [...resolved].sort((a, b) => {
    const statusA = a.status || 'past';
    const statusB = b.status || 'past';

    if (statusA !== statusB) {
      return priority[statusA] - priority[statusB];
    }

    const timeA = parseDate(a.sortDate ?? a.date) ?? 0;
    const timeB = parseDate(b.sortDate ?? b.date) ?? 0;

    return statusA === 'past' ? timeB - timeA : timeA - timeB;
  });
}

export function filterEvents(
  items: readonly EventItem[],
  filter: EventFilter
): EventItem[] {
  const sorted = sortEvents(items);
  if (filter === 'all') return sorted;
  return sorted.filter((event) => event.status === filter);
}

export function getHomepageEvents(items: readonly EventItem[]): EventItem[] {
  const sorted = sortEvents(items);

  const activeEvents = sorted.filter((e) => e.status === 'ongoing' || e.status === 'upcoming');
  const pastEvents = sorted.filter((e) => e.status === 'past');

  if (activeEvents.length >= 2) {
    return activeEvents.slice(0, 2);
  }

  if (activeEvents.length === 1) {
    return [...activeEvents, ...pastEvents.slice(0, 1)];
  }

  return pastEvents.slice(0, 2);
}