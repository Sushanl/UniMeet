import { supabase } from '../supabaseClient'

export async function seedDatabase() {
  const dummyEvents = [
    {
      name: 'Campus Coffee Meetup',
      description: 'Join us for a casual coffee meetup at the Student Center. Great opportunity to meet new people and make friends!',
      location_lat: 37.8015,
      location_long: -122.4015,
      location_name: 'Student Center Cafe',
      type: 'social',
      club_name: 'Social Club',
      time: new Date('2024-11-18T10:00:00').toISOString(),
      capacity: 20,
      club_url: null,
      image_url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400',
      owner_user: null
    },
    {
      name: 'Study Group - Computer Science',
      description: 'Weekly CS study group covering data structures and algorithms. All levels welcome!',
      location_lat: 37.8025,
      location_long: -122.4025,
      location_name: 'Library Room 204',
      type: 'study',
      club_name: 'CS Study Group',
      time: new Date('2024-11-18T14:00:00').toISOString(),
      capacity: 15,
      club_url: null,
      image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
      owner_user: null
    },
    {
      name: 'Basketball Pickup Game',
      description: 'Pickup basketball game every Monday and Wednesday. All skill levels welcome!',
      location_lat: 37.7995,
      location_long: -122.4005,
      location_name: 'Recreation Center',
      type: 'sports',
      club_name: 'Intramural Sports',
      time: new Date('2024-11-19T17:00:00').toISOString(),
      capacity: 30,
      club_url: null,
      image_url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400',
      owner_user: null
    },
    {
      name: 'Engineering Club Meeting',
      description: 'Monthly engineering club meeting. We will discuss upcoming projects and competitions.',
      location_lat: 37.8005,
      location_long: -122.3995,
      location_name: 'Engineering Building 301',
      type: 'club',
      club_name: 'Engineering Society',
      time: new Date('2024-11-20T18:00:00').toISOString(),
      capacity: 40,
      club_url: null,
      image_url: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400',
      owner_user: null
    },
    {
      name: 'Open Mic Night',
      description: 'Showcase your talent! Poetry, music, comedy - all performers welcome. Sign up at the door.',
      location_lat: 37.8035,
      location_long: -122.4035,
      location_name: 'Campus Auditorium',
      type: 'entertainment',
      club_name: 'Arts & Culture',
      time: new Date('2024-11-21T19:30:00').toISOString(),
      capacity: 100,
      club_url: null,
      image_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400',
      owner_user: null
    },
    {
      name: 'Yoga in the Park',
      description: 'Free outdoor yoga session. Bring your own mat and water bottle.',
      location_lat: 37.8020,
      location_long: -122.4010,
      location_name: 'University Park',
      type: 'sports',
      club_name: 'Wellness Club',
      time: new Date('2024-11-22T08:00:00').toISOString(),
      capacity: 25,
      club_url: null,
      image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
      owner_user: null
    },
    {
      name: 'Hackathon Kickoff',
      description: '24-hour hackathon! Build something amazing with your team. Prizes and food provided.',
      location_lat: 37.8030,
      location_long: -122.4020,
      location_name: 'Computer Science Building',
      type: 'club',
      club_name: 'Tech Society',
      time: new Date('2024-11-23T09:00:00').toISOString(),
      capacity: 60,
      club_url: null,
      image_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400',
      owner_user: null
    },
    {
      name: 'Board Game Night',
      description: 'Casual board game night with snacks. We have classics and modern games available!',
      location_lat: 37.8010,
      location_long: -122.4000,
      location_name: 'Student Lounge',
      type: 'social',
      club_name: 'Games Club',
      time: new Date('2024-11-23T18:00:00').toISOString(),
      capacity: 30,
      club_url: null,
      image_url: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400',
      owner_user: null
    }
  ]

  const { data: insertedEvents, error: eventsError } = await supabase
    .from('Events')
    .insert(dummyEvents)
    .select()

  if (eventsError) {
    throw new Error(`Failed to seed events: ${eventsError.message}`)
  }

  console.log(`Successfully seeded ${insertedEvents?.length || 0} events`)
  return insertedEvents
}
