import type { EventCardProps } from '../components/EventCard';
import type { SearchFilters } from '../components/SearchBar';

export function filterEvents(
  events: EventCardProps[],
  filters: SearchFilters
): EventCardProps[] {
  return events.filter((event) => {
    // Search term filter
    if (filters.searchTerm) {
      const searchTerms = filters.searchTerm
        .toLowerCase()
        .split(',')
        .map(term => term.trim())
        .filter(term => term.length > 0);

      const searchableText = [
        event.title,
        event.location,
        ...event.tags
      ].join(' ').toLowerCase();

      const matchesSearch = searchTerms.some(term =>
        searchableText.includes(term)
      );

      if (!matchesSearch) return false;
    }

    // Time filter (based on event date)
    if (filters.timeFilter !== 'any') {
      const eventDate = new Date(event.date);
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      switch (filters.timeFilter) {
        case 'today':
          if (eventDate < today) return false;
          break;
        case 'week': {
          const weekFromNow = new Date(today);
          weekFromNow.setDate(weekFromNow.getDate() + 7);
          if (eventDate < today || eventDate > weekFromNow) return false;
          break;
        }
        case 'month': {
          const monthFromNow = new Date(today);
          monthFromNow.setMonth(monthFromNow.getMonth() + 1);
          if (eventDate < today || eventDate > monthFromNow) return false;
          break;
        }
      }
    }

    // Location filter
    if (filters.locationFilter && filters.locationFilter !== 'all') {
      if (event.location !== filters.locationFilter) return false;
    }

    // Event type filter
    if (filters.eventTypeFilter !== 'all') {
      if (event.eventType !== filters.eventTypeFilter) return false;
    }

    // Capacity filter
    if (filters.capacityFilter !== 'all') {
      const attendees = event.attendees;
      switch (filters.capacityFilter) {
        case 'small':
          if (attendees > 20) return false;
          break;
        case 'medium':
          if (attendees < 21 || attendees > 50) return false;
          break;
        case 'large':
          if (attendees < 51) return false;
          break;
      }
    }

    return true;
  });
}

export function getUniqueLocations(events: EventCardProps[]): string[] {
  const locations = new Set(events.map(event => event.location));
  return Array.from(locations).sort();
}
