import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { SignIn } from './components/SignIn';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { Events } from './pages/Events';
import { Communities } from './pages/Communities';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div className="h-screen flex flex-col overflow-hidden">
                <Header />
                <div className="flex-1 overflow-hidden">
                  <Home />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <div className="h-screen flex flex-col overflow-hidden">
                <Header />
                <div className="flex-1 overflow-auto">
                  <Events />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/communities"
          element={
            <ProtectedRoute>
              <div className="h-screen flex flex-col overflow-hidden">
                <Header />
                <div className="flex-1 overflow-auto">
                  <Communities />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
