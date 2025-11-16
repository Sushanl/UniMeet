import { Coffee, BookOpen, Dumbbell, Users, Music, type LucideIcon } from 'lucide-react';
import type { EventType } from '../components/EventCard';

export const eventTypeIcons: Record<EventType, LucideIcon> = {
  social: Coffee,
  study: BookOpen,
  sports: Dumbbell,
  club: Users,
  entertainment: Music
};

export function getEventIcon(eventType: EventType): LucideIcon {
  return eventTypeIcons[eventType];
}
