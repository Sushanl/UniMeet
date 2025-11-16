import { MainLayout } from '../components/MainLayout';
import { mockEvents } from '../mockdata/mockEvents';

export function Home() {
  return <MainLayout events={mockEvents} />;
}
