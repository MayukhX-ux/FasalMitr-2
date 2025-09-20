import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate
} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import { useTranslation } from 'react-i18next';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

function App() {
  const [user, setUser] = useState(() => {
    // Try to load from localStorage to persist session
    try {
      const userData = localStorage.getItem('smallFarmersUser');
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  });

  const { i18n } = useTranslation();

  // On user language change, store new user pref and apply language
  useEffect(() => {
    if (user?.language) {
      i18n.changeLanguage(user.language);
    }
  }, [user?.language, i18n]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('smallFarmersUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smallFarmersUser');
  };

  return (
    <UserContext.Provider value={{ user, login, logout, setUser }}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/dashboard" replace /> : <LandingPage />}
          />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/" replace />}
          />
          {/* Default redirect */}
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} replace />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
