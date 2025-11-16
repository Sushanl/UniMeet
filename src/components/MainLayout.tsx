import { EventSidebar } from './EventSidebar';
import { MapPlaceholder } from './MapPlaceholder';
import type { EventCardProps } from './EventCard';

interface MainLayoutProps {
  events: EventCardProps[];
}

export function MainLayout({ events }: MainLayoutProps) {
  return (
    <div className="flex h-full w-full">
      <div className="w-[400px] flex-shrink-0">
        <EventSidebar events={events} />
      </div>
      <div className="flex-1">
        <MapPlaceholder events={events} />
      </div>
    </div>
  );
}
