import { supabase } from '../supabaseClient'
import type { Event, EventWithAttendees } from './types'

export async function getAllEvents(): Promise<EventWithAttendees[]> {
  const { data: events, error: eventsError } = await supabase
    .from('Events')
    .select('*')
    .order('time', { ascending: true })

  if (eventsError) {
    throw new Error(`Failed to fetch events: ${eventsError.message}`)
  }

  if (!events || events.length === 0) {
    return []
  }

  const eventIds = events.map(event => event.id)

  const { data: attendees, error: attendeesError } = await supabase
    .from('Attendees')
    .select('event_id, user_id')
    .in('event_id', eventIds)

  if (attendeesError) {
    throw new Error(`Failed to fetch attendees: ${attendeesError.message}`)
  }

  const attendeesByEvent = new Map<number, string[]>()

  attendees?.forEach((attendee) => {
    if (attendee.event_id && attendee.user_id) {
      const existing = attendeesByEvent.get(attendee.event_id) || []
      attendeesByEvent.set(attendee.event_id, [...existing, attendee.user_id])
    }
  })

  const eventsWithAttendees: EventWithAttendees[] = events.map((event: Event) => ({
    ...event,
    attendees: attendeesByEvent.get(event.id) || []
  }))

  return eventsWithAttendees
}
