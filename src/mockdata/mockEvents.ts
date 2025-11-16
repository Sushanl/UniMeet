import type { EventCardProps } from "../components/EventCard";

export const mockEvents: EventCardProps[] = [
  {
    id: '1',
    title: 'Campus Coffee Meetup',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400',
    date: 'Nov 18',
    time: '10:00 AM',
    location: 'Student Center Cafe',
    latitude: 37.8015,
    longitude: -122.4015,
    attendees: 12,
    tags: ['Social', 'Coffee']
  },
  {
    id: '2',
    title: 'Study Group - Computer Science',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
    date: 'Nov 18',
    time: '2:00 PM',
    location: 'Library Room 204',
    latitude: 37.8025,
    longitude: -122.4025,
    attendees: 8,
    tags: ['Study', 'CS']
  },
  {
    id: '3',
    title: 'Basketball Pickup Game',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400',
    date: 'Nov 19',
    time: '5:00 PM',
    location: 'Recreation Center',
    latitude: 37.7995,
    longitude: -122.4005,
    attendees: 15,
    tags: ['Sports', 'Basketball']
  },
  {
    id: '4',
    title: 'Engineering Club Meeting',
    imageUrl: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400',
    date: 'Nov 20',
    time: '6:00 PM',
    location: 'Engineering Building 301',
    latitude: 37.8005,
    longitude: -122.3995,
    attendees: 25,
    tags: ['Club', 'Engineering']
  },
  {
    id: '5',
    title: 'Open Mic Night',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400',
    date: 'Nov 21',
    time: '7:30 PM',
    location: 'Campus Auditorium',
    latitude: 37.8035,
    longitude: -122.4035,
    attendees: 45,
    tags: ['Entertainment', 'Music']
  }
];