import { EventCard } from './EventCard';
import type { EventCardProps } from './EventCard';
import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';

interface EventSidebarProps {
  events: EventCardProps[];
}

export interface EventSidebarRef {
  scrollToEvent: (eventId: string) => void;
}

export const EventSidebar = forwardRef<EventSidebarRef, EventSidebarProps>(({ events }, ref) => {
  const eventRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [highlightedEventId, setHighlightedEventId] = useState<string | null>(null);

  useImperativeHandle(ref, () => ({
    scrollToEvent: (eventId: string) => {
      const element = eventRefs.current.get(eventId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setHighlightedEventId(eventId);

        // Remove highlight after animation
        setTimeout(() => {
          setHighlightedEventId(null);
        }, 2000);
      }
    }
  }));

  useEffect(() => {
    // Clean up refs for events that no longer exist
    const currentEventIds = new Set(events.map(e => e.id));
    eventRefs.current.forEach((_, id) => {
      if (!currentEventIds.has(id)) {
        eventRefs.current.delete(id);
      }
    });
  }, [events]);

  return (
    <aside className="w-full h-full overflow-y-auto bg-gray-50 border-r border-gray-200">
      <div className="p-4">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {events.map((event) => (
            <EventCard
              key={event.id}
              {...event}
              ref={(el) => {
                if (el) {
                  eventRefs.current.set(event.id, el);
                } else {
                  eventRefs.current.delete(event.id);
                }
              }}
              isHighlighted={highlightedEventId === event.id}
            />
          ))}
        </div>
      </div>
    </aside>
  );
});

EventSidebar.displayName = 'EventSidebar';
