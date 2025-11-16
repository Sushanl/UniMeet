import { EventSidebar, type EventSidebarRef } from './EventSidebar';
import { OSMMap } from './Map';
import type { EventCardProps } from './EventCard';
import type { SearchFilters } from './SearchBar';
import { useRef } from 'react';

interface MainLayoutProps {
  events: EventCardProps[];
  allEvents: EventCardProps[];
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onEventsUpdate?: () => void;
}

export function MainLayout({ events, allEvents, filters, onFiltersChange, onEventsUpdate }: MainLayoutProps) {
  const sidebarRef = useRef<EventSidebarRef>(null);

  const handleMarkerClick = (eventId: string) => {
    sidebarRef.current?.scrollToEvent(eventId);
  };

  return (
    <div className="flex h-full w-full">
      <div className="w-2/5 flex-shrink-0">
        <EventSidebar
          ref={sidebarRef}
          events={events}
          allEvents={allEvents}
          filters={filters}
          onFiltersChange={onFiltersChange}
          onEventsUpdate={onEventsUpdate}
        />
      </div>
      <div className="flex-1">
        <OSMMap events={events} onMarkerClick={handleMarkerClick} />
      </div>
    </div>
  );
}
