import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../lib/useAuth'
import { supabase } from '../lib/supabaseClient'
import { EventCard, type EventCardProps, type EventType } from '../components/EventCard'
import { EventDetailView } from '../components/EventDetailView'
import { useNavigate } from 'react-router-dom'
import { Text } from '@radix-ui/themes'

export function Attending() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [events, setEvents] = useState<EventCardProps[]>([])
  const [selectedEvent, setSelectedEvent] = useState<EventCardProps | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchEvents = useCallback(async () => {
    if (!user) return

    setLoading(true)
    try {
      // Fetch events the user is attending
      const { data: attendeesData, error: attendeesError } = await supabase
        .from('Attendees')
        .select('event_id')
        .eq('user_id', user.id)

      if (attendeesError) {
        console.error('Error fetching attendees:', attendeesError)
        setLoading(false)
        return
      }

      if (!attendeesData || attendeesData.length === 0) {
        setEvents([])
        setSelectedEvent(null)
        setLoading(false)
        return
      }

      const eventIds = attendeesData.map(a => a.event_id)

      // Fetch the actual event details
      const { data: eventsData, error: eventsError } = await supabase
        .from('Events')
        .select('*')
        .in('id', eventIds)
        .order('time', { ascending: true })

      if (eventsError) {
        console.error('Error fetching events:', eventsError)
        setLoading(false)
        return
      }

      if (!eventsData || eventsData.length === 0) {
        setEvents([])
        setSelectedEvent(null)
        setLoading(false)
        return
      }

      // Fetch attendee counts for each event
      const eventsWithAttendees = await Promise.all(
        eventsData.map(async (event) => {
          const { count } = await supabase
            .from('Attendees')
            .select('*', { count: 'exact', head: true })
            .eq('event_id', event.id)

          return {
            ...event,
            attendeeCount: count || 0
          }
        })
      )

      // Transform to EventCard format
      const transformedEvents: EventCardProps[] = eventsWithAttendees.map((event) => {
        const eventTime = new Date(event.time)
        const dateStr = eventTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        const timeStr = eventTime.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })

        return {
          id: event.id.toString(),
          title: event.name,
          imageUrl: event.club_url || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400',
          date: dateStr,
          time: timeStr,
          location: event.location_name,
          latitude: event.location_lat,
          longitude: event.location_long,
          attendees: event.attendeeCount,
          tags: [event.type, event.club_name].filter(Boolean),
          eventType: (event.type as EventType) || 'social'
        }
      })

      setEvents(transformedEvents)
      // Set the first event as selected by default
      if (transformedEvents.length > 0) {
        setSelectedEvent(transformedEvents[0])
      }
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (!user) {
      navigate('/signin')
      return
    }
    fetchEvents()
  }, [user, navigate, fetchEvents])

  if (loading) {
    return (
      <div className="p-8">
        <Text>Loading...</Text>
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Attending</h1>
        <div className="text-center py-12">
          <Text size="4" className="text-gray-600">
            You are not attending any events yet.
          </Text>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="p-8 pb-4">
        <h1 className="text-3xl font-bold">Attending</h1>
      </div>

      <div className="flex-1 flex gap-6 px-8 pb-8 overflow-hidden">
        {/* Grid View - Left Side */}
        <div className="w-1/2 overflow-y-auto">
          <div className="grid grid-cols-1 gap-4">
            {events.map((event) => (
              <div key={event.id}>
                <EventCard
                  {...event}
                  onClick={() => setSelectedEvent(event)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Detail View - Right Side */}
        <div className="w-1/2 overflow-y-auto">
          {selectedEvent && <EventDetailView event={selectedEvent} />}
        </div>
      </div>
    </div>
  )
}
