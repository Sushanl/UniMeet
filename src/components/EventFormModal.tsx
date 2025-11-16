import { useState, useEffect } from 'react'
import { Button, Dialog, TextField, TextArea, Select, Flex, Text } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import type { EventCardProps, EventType } from './EventCard'
import { LocationAutocomplete } from './LocationAutocomplete'

interface EventFormData {
  name: string
  description: string
  type: EventType
  location_name: string
  location_lat: number
  location_long: number
  date: string
  time: string
  capacity: number
  club_name: string
  club_url: string
}

interface EventFormModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  editingEvent: EventCardProps | null
  userId: string
  onSuccess: () => void
}

const initialFormData: EventFormData = {
  name: '',
  description: '',
  type: 'social',
  location_name: '',
  location_lat: 0,
  location_long: 0,
  date: '',
  time: '',
  capacity: 0,
  club_name: '',
  club_url: ''
}

export function EventFormModal({
  isOpen,
  onOpenChange,
  editingEvent,
  userId,
  onSuccess
}: EventFormModalProps) {
  const [formData, setFormData] = useState<EventFormData>(initialFormData)

  // Load event data when editing
  useEffect(() => {
    const loadEventData = async () => {
      if (editingEvent && isOpen) {
        try {
          const { data: eventData, error } = await supabase
            .from('Events')
            .select('*')
            .eq('id', parseInt(editingEvent.id))
            .single()

          if (error || !eventData) {
            console.error('Error fetching event data:', error)
            return
          }

          // Format the time for separate date and time inputs
          const eventTime = new Date(eventData.time)
          const dateString = eventTime.toISOString().split('T')[0] // YYYY-MM-DD
          const timeString = eventTime.toTimeString().slice(0, 5) // HH:MM

          setFormData({
            name: eventData.name,
            description: eventData.description || '',
            type: (eventData.type as EventType) || 'social',
            location_name: eventData.location_name,
            location_lat: eventData.location_lat,
            location_long: eventData.location_long,
            date: dateString,
            time: timeString,
            capacity: eventData.capacity || 0,
            club_name: eventData.club_name || '',
            club_url: eventData.club_url || ''
          })
        } catch (error) {
          console.error('Error fetching event data:', error)
        }
      } else if (!editingEvent && isOpen) {
        // Reset form for new event
        setFormData(initialFormData)
      }
    }

    loadEventData()
  }, [editingEvent, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Combine date and time into a single datetime
      const dateTime = new Date(`${formData.date}T${formData.time}`)
      
      const eventData = {
        name: formData.name,
        description: formData.description,
        type: formData.type,
        location_name: formData.location_name,
        location_lat: formData.location_lat,
        location_long: formData.location_long,
        time: dateTime.toISOString(),
        capacity: formData.capacity,
        club_name: formData.club_name,
        club_url: formData.club_url,
        owner_user: userId
      }

      if (editingEvent) {
        // Update existing event
        const { error } = await supabase
          .from('Events')
          .update(eventData)
          .eq('id', parseInt(editingEvent.id))

        if (error) {
          console.error('Error updating event:', error)
          alert('Failed to update event')
        } else {
          onOpenChange(false)
          onSuccess()
        }
      } else {
        // Create new event
        const { error } = await supabase
          .from('Events')
          .insert([eventData])

        if (error) {
          console.error('Error creating event:', error)
          alert('Failed to create event')
        } else {
          onOpenChange(false)
          onSuccess()
        }
      }
    } catch (error) {
      console.error('Error saving event:', error)
      alert('Failed to save event')
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Content 
        size="4" 
        maxWidth="600px"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 10px 38px -10px rgba(22, 23, 24, 0.35), 0 10px 20px -15px rgba(22, 23, 24, 0.2)',
          zIndex: 1000,
          maxHeight: '90vh',
          overflowY: 'auto',
          animation: 'none'
        }}
      >
        <Flex justify="between" align="center" mb="4">
          <Dialog.Title size="6">
            {editingEvent ? 'Edit Event' : 'Create New Event'}
          </Dialog.Title>
          <Dialog.Close>
            <Button variant="ghost" size="2">
              <X size={16} />
            </Button>
          </Dialog.Close>
        </Flex>

        <Dialog.Description>
          {editingEvent ? 'Update the details of your event below.' : 'Fill in the details below to create a new event.'}
        </Dialog.Description>

        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4">
            <div>
              <Text size="2" weight="medium" mb="2" as="div">Event Name</Text>
              <TextField.Root
                placeholder="Event Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                size="3"
              />
            </div>

            <div>
              <Text size="2" weight="medium" mb="2" as="div">Description</Text>
              <TextArea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                size="3"
              />
            </div>

            <div>
              <Text size="2" weight="medium" mb="2" as="div">Event Type</Text>
              <Select.Root
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value as EventType })}
                size="3"
              >
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="social">Social</Select.Item>
                  <Select.Item value="study">Study</Select.Item>
                  <Select.Item value="sports">Sports</Select.Item>
                  <Select.Item value="club">Club</Select.Item>
                  <Select.Item value="entertainment">Entertainment</Select.Item>
                </Select.Content>
              </Select.Root>
            </div>

            <div>
              <Text size="2" weight="medium" mb="2" as="div">Location</Text>
              <LocationAutocomplete
                value={formData.location_name}
                onLocationChange={(location) => setFormData({
                  ...formData,
                  location_name: location.name,
                  location_lat: location.lat,
                  location_long: location.lng
                })}
                required
              />
            </div>

            <Flex gap="2">
              <div style={{ flex: 1 }}>
                <Text size="2" weight="medium" mb="2" as="div">Date</Text>
                <TextField.Root
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  size="3"
                />
              </div>
              <div style={{ flex: 1 }}>
                <Text size="2" weight="medium" mb="2" as="div">Time</Text>
                <TextField.Root
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                  size="3"
                />
              </div>
            </Flex>

            <div>
              <Text size="2" weight="medium" mb="2" as="div">Capacity</Text>
              <TextField.Root
                type="number"
                placeholder="Capacity"
                value={formData.capacity || ''}
                onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })}
                min="1"
                size="3"
              />
            </div>

            <div>
              <Text size="2" weight="medium" mb="2" as="div">Club Name (optional)</Text>
              <TextField.Root
                placeholder="Club Name"
                value={formData.club_name}
                onChange={(e) => setFormData({ ...formData, club_name: e.target.value })}
                size="3"
              />
            </div>

            <div>
              <Text size="2" weight="medium" mb="2" as="div">Image URL (optional)</Text>
              <TextField.Root
                type="url"
                placeholder="https://example.com/image.jpg"
                value={formData.club_url}
                onChange={(e) => setFormData({ ...formData, club_url: e.target.value })}
                size="3"
              />
            </div>
          </Flex>

          <Flex gap="3" mt="6" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray" size="3">
                Cancel
              </Button>
            </Dialog.Close>
            <Button type="submit" size="3">
              {editingEvent ? 'Update Event' : 'Create Event'}
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
}

