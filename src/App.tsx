import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { SignIn } from './components/SignIn';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { Attending } from './pages/Attending';
import { Hosting } from './pages/Hosting';

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
          path="/attending"
          element={
            <ProtectedRoute>
              <div className="h-screen flex flex-col overflow-hidden">
                <Header />
                <div className="flex-1 overflow-auto">
                  <Attending />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/hosting"
          element={
            <ProtectedRoute>
              <div className="h-screen flex flex-col overflow-hidden">
                <Header />
                <div className="flex-1 overflow-auto">
                  <Hosting />
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
