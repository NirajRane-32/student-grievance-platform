import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import StudentPortal from './pages/StudentPortal';
import OfficerPortal from './pages/OfficerPortal';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/student/*"
          element={user?.role === 'student' ? <StudentPortal /> : <Navigate to="/login" />}
        />
        <Route
          path="/officer/*"
          element={user?.role === 'officer' ? <OfficerPortal /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to={user ? `/${user.role}` : '/login'} />} />
      </Routes>
    </Router>
  );
}

export default App;
