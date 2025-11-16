import { EventCard } from './EventCard';
import type { EventCardProps } from './EventCard';

interface EventSidebarProps {
  events: EventCardProps[];
}

export function EventSidebar({ events }: EventSidebarProps) {
  return (
    <aside className="w-full h-full overflow-y-auto bg-gray-50 border-r border-gray-200">
      <div className="p-4">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </div>
    </aside>
  );
}
