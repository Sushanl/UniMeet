export interface Event {
  id: number
  description: string | null
  name: string | null
  location_lat: number | null
  location_long: number | null
  location_name: string | null
  type: string | null
  club_name: string | null
  created_at: string
  time: string | null
  capacity: number | null
  club_url: string | null
  owner_user: string | null
  image_url: string | null
}

export interface Attendee {
  id: number
  created_at: string
  event_id: number | null
  user_id: string | null
}

export interface EventWithAttendees extends Event {
  attendees: string[]
}
