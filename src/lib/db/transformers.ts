import type { EventWithAttendees } from './types'
import type { EventCardProps, EventType } from '../../components/EventCard'

export function transformEventToCard(event: EventWithAttendees): EventCardProps {
  const eventType = (event.type?.toLowerCase() || 'social') as EventType

  const eventDate = event.time ? new Date(event.time) : new Date()
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })

  return {
    id: event.id.toString(),
    title: event.name || 'Untitled Event',
    imageUrl: event.image_url || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400',
    date: formattedDate,
    time: formattedTime,
    location: event.location_name || 'Location TBD',
    latitude: event.location_lat || 0,
    longitude: event.location_long || 0,
    attendees: event.attendees.length,
    tags: [
      event.club_name,
      event.type
    ].filter((tag): tag is string => Boolean(tag)),
    eventType
  }
}

export function transformEventsToCards(events: EventWithAttendees[]): EventCardProps[] {
  return events.map(transformEventToCard)
}
