import { Flex } from '@radix-ui/themes';
import { EventCard } from './EventCard';
import type { EventCardProps } from './EventCard';

interface EventSidebarProps {
  events: EventCardProps[];
}

export function EventSidebar({ events }: EventSidebarProps) {
  return (
    <aside className="w-full h-full overflow-y-auto bg-gray-50 border-r border-gray-200">
      <div className="p-4">
        <Flex direction="column" gap="4">
          {events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </Flex>
      </div>
    </aside>
  );
}
