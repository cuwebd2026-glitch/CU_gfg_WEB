import type { EventItem } from '@/data/content';

export type EventFilter = 'all' | 'upcoming' | 'past';

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
  return [...items].sort((a, b) => {
    if (a.status !== b.status) return a.status === 'upcoming' ? -1 : 1;

    return compareDates(a, b, a.status === 'upcoming' ? 1 : -1);
  });
}

export function filterEvents(items: readonly EventItem[], filter: EventFilter): EventItem[] {
  return sortEvents(filter === 'all' ? items : items.filter((event) => event.status === filter));
}

export function getHomepageEvents(items: readonly EventItem[]): EventItem[] {
  const upcoming = filterEvents(items, 'upcoming')[0];
  const past = filterEvents(items, 'past')[0];
  return [upcoming, past].filter((event): event is EventItem => Boolean(event));
}
