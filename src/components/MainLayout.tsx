import { EventSidebar, type EventSidebarRef } from './EventSidebar';
import { OSMMap } from './Map';
import type { EventCardProps } from './EventCard';
import { useRef } from 'react';

interface MainLayoutProps {
  events: EventCardProps[];
}

export function MainLayout({ events }: MainLayoutProps) {
  const sidebarRef = useRef<EventSidebarRef>(null);

  const handleMarkerClick = (eventId: string) => {
    sidebarRef.current?.scrollToEvent(eventId);
  };

  return (
    <div className="flex h-full w-full">
      <div className="w-2/5 flex-shrink-0">
        <EventSidebar ref={sidebarRef} events={events} />
      </div>
      <div className="flex-1">
        <OSMMap events={events} onMarkerClick={handleMarkerClick} />
      </div>
    </div>
  );
}
