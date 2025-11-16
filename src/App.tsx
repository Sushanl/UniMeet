import './App.css';
import { Header } from './components/Header';
import { MainLayout } from './components/MainLayout';
import { SignIn } from './components/SignIn';
import { useAuth } from './lib/authContext';
import type { EventCardProps } from './components/EventCard';

const mockEvents: EventCardProps[] = [
  {
    id: '1',
    title: 'Campus Coffee Meetup',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400',
    date: 'Nov 18',
    time: '10:00 AM',
    location: 'Student Center Cafe',
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
    attendees: 45,
    tags: ['Entertainment', 'Music']
  }
];

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-black">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <SignIn />;
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 overflow-hidden">
        <MainLayout events={mockEvents} />
      </div>
    </div>
  );
}

export default App;
