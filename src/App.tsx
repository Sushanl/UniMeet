import './App.css';
import { Header } from './components/Header';
import { MainLayout } from './components/MainLayout';
import { SignIn } from './components/SignIn';
import { useAuth } from './lib/authContext';
import { mockEvents } from './mockdata/mockEvents';

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
