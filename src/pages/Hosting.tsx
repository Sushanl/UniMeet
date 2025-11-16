import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../lib/useAuth'
import { supabase } from '../lib/supabaseClient'
import { EventCard, type EventCardProps, type EventType } from '../components/EventCard'
import { useNavigate } from 'react-router-dom'
import { Button, Flex, Text } from '@radix-ui/themes'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { EventFormModal } from '../components/EventFormModal'

export function Hosting() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [events, setEvents] = useState<EventCardProps[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<EventCardProps | null>(null)

  const fetchEvents = useCallback(async () => {
    if (!user) return

    setLoading(true)
    try {
      // Fetch events created by the current user
      const { data: eventsData, error: eventsError } = await supabase
        .from('Events')
        .select('*')
        .eq('owner_user', user.id)
        .order('time', { ascending: true })

      if (eventsError) {
        console.error('Error fetching events:', eventsError)
        setLoading(false)
        return
      }

      if (!eventsData || eventsData.length === 0) {
        setEvents([])
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

  const handleCreateClick = () => {
    setEditingEvent(null)
    setIsDialogOpen(true)
  }

  const handleEditClick = (event: EventCardProps) => {
    setEditingEvent(event)
    setIsDialogOpen(true)
  }

  const handleDelete = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return

    try {
      // First delete all attendees
      const { error: attendeesError } = await supabase
        .from('Attendees')
        .delete()
        .eq('event_id', parseInt(eventId))

      if (attendeesError) {
        console.error('Error deleting attendees:', attendeesError)
      }

      // Then delete the event
      const { error } = await supabase
        .from('Events')
        .delete()
        .eq('id', parseInt(eventId))

      if (error) {
        console.error('Error deleting event:', error)
        alert('Failed to delete event')
      } else {
        fetchEvents()
      }
    } catch (error) {
      console.error('Error deleting event:', error)
      alert('Failed to delete event')
    }
  }


  if (loading) {
    return (
      <div className="p-8">
        <Text>Loading...</Text>
      </div>
    )
  }

  return (
    <div className="p-8">
      <Flex justify="between" align="center" className="mb-6">
        <h1 className="text-3xl font-bold">Hosting</h1>
        <Button onClick={handleCreateClick} size="3">
          <Plus size={16} />
          Create Event
        </Button>
      </Flex>

      {events.length === 0 ? (
        <div className="text-center py-12">
          <Text size="4" className="text-gray-600 mb-4">
            You haven't created any events yet.
          </Text>
          <Button onClick={handleCreateClick} size="3">
            Create Your First Event
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="relative" style={{ position: 'relative', overflow: 'visible' }}>
              <div style={{ position: 'relative' }}>
                <EventCard {...event} />
                <div 
                  style={{ 
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    zIndex: 50,
                    display: 'flex',
                    gap: '8px'
                  }}
                >
                  <Button
                    size="2"
                    variant="solid"
                    color="blue"
                    onClick={() => handleEditClick(event)}
                  >
                    <Edit size={14} />
                  </Button>
                  <Button
                    size="2"
                    variant="solid"
                    color="red"
                    onClick={() => handleDelete(event.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {user && (
        <EventFormModal
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          editingEvent={editingEvent}
          userId={user.id}
          onSuccess={fetchEvents}
        />
      )}
    </div>
  )
}
