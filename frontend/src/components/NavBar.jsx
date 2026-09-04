import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './NavBar.css';

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">📋 Student Grievance Platform</div>
      <div className="nav-links">
        {user?.role === 'student' && (
          <>
            <Link to="/student">Dashboard</Link>
            <Link to="/student/file-complaint">File Complaint</Link>
            <Link to="/student/tracker">Track Complaint</Link>
          </>
        )}
        {user?.role === 'officer' && (
          <>
            <Link to="/officer">Officer Panel</Link>
          </>
        )}
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}

export default NavBar;
