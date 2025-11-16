import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { EventCard } from './EventCard';
import type { EventCardProps } from './EventCard';
import { EventDetailView } from './EventDetailView';
import { supabase } from '../lib/supabaseClient';

interface EventSidebarProps {
  events: EventCardProps[];
  onEventsUpdate?: () => void;
}

export interface EventSidebarRef {
  scrollToEvent: (eventId: string) => void;
}

export const EventSidebar = forwardRef<EventSidebarRef, EventSidebarProps>(({ events }, ref) => {
  const eventRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [highlightedEventId, setHighlightedEventId] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventCardProps | null>(null);
  const isInDetailView = useRef(false);

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

  useEffect(() => {
    // DO NOT update selectedEvent when events change if user is viewing detail
    // This prevents navigation glitches
    if (selectedEvent && !isInDetailView.current) {
      const updatedEvent = events.find(e => e.id === selectedEvent.id);
      if (updatedEvent) {
        setSelectedEvent(updatedEvent);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events]);
  
  // Track when we're in detail view
  useEffect(() => {
    isInDetailView.current = selectedEvent !== null;
  }, [selectedEvent]);

  return (
    <aside className="w-full h-full overflow-y-auto bg-gray-50 border-r border-gray-200">
      <AnimatePresence mode="wait">
        {selectedEvent ? (
          <EventDetailView
            key="detail"
            event={selectedEvent}
            onBack={() => setSelectedEvent(null)}
            onAttendeeChange={async () => {
              // Update the selected event's attendee count locally
              // DO NOT call onEventsUpdate while viewing detail to prevent navigation
              try {
                // Fetch updated attendee count for this specific event
                const { count } = await supabase
                  .from('Attendees')
                  .select('*', { count: 'exact', head: true })
                  .eq('event_id', parseInt(selectedEvent.id));
                
                if (count !== null && selectedEvent) {
                  // Update the selected event's attendee count
                  // This keeps the user on the detail view
                  setSelectedEvent({
                    ...selectedEvent,
                    attendees: count
                  });
                }
              } catch (error) {
                console.error('Error updating attendee count:', error);
              }
              // Do NOT call onEventsUpdate here - it causes navigation
            }}
          />
        ) : (
          <div key="grid" className="p-4">
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
                  onClick={() => setSelectedEvent(event)}
                />
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>
    </aside>
  );
});

EventSidebar.displayName = 'EventSidebar';
