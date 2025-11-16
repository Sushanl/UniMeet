import { EventSidebar } from './EventSidebar';
import { OSMMap } from './Map';
import type { EventCardProps } from './EventCard';

interface MainLayoutProps {
  events: EventCardProps[];
}

export function MainLayout({ events }: MainLayoutProps) {
  return (
    <div className="flex h-full w-full">
      <div className="w-2/5 flex-shrink-0">
        <EventSidebar events={events} />
      </div>
      <div className="flex-1">
        <OSMMap events={events} />
      </div>
    </div>
  );
}
