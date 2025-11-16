import { MainLayout } from '../components/MainLayout';
import { useEffect, useState } from 'react';
import { getAllEvents } from '../lib/db/events';
import { transformEventsToCards } from '../lib/db/transformers';
import { seedDatabase } from '../lib/db/seed';
import type { EventCardProps } from '../components/EventCard';
import type { SearchFilters } from '../components/SearchBar';
import { filterEvents } from '../lib/filterEvents';

export function Home() {
  const [events, setEvents] = useState<EventCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    timeFilter: 'any',
    locationFilter: 'all',
    eventTypeFilter: 'all',
    capacityFilter: 'all',
  });

  useEffect(() => {
    async function fetchEvents() {
      try {
        setIsLoading(true);
        let dbEvents = await getAllEvents();

        if (dbEvents.length === 0) {
          console.log('No events found, seeding database...');
          await seedDatabase();
          dbEvents = await getAllEvents();
        }

        const transformedEvents = transformEventsToCards(dbEvents);
        setEvents(transformedEvents);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch events');
        console.error('Error fetching events:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  const filteredEvents = filterEvents(events, filters);

  return <MainLayout events={filteredEvents} allEvents={events} filters={filters} onFiltersChange={setFilters} />;
}
