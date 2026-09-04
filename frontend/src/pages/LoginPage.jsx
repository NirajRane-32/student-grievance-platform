import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { authAPI } from '../services/api';
import './LoginPage.css';

function LoginPage() {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const endpoint = role === 'student' ? authAPI.loginStudent : authAPI.loginOfficer;
      const response = await endpoint({ email, password });
      login(response.data.student || response.data.officer, response.data.token);
      navigate(`/${role}`);
    } catch (error) {
      alert('Login failed: ' + error.response?.data?.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const endpoint = role === 'student' ? authAPI.registerStudent : authAPI.registerOfficer;
      const response = await endpoint(formData);
      login(response.data.student || response.data.officer, response.data.token);
      navigate(`/${role}`);
    } catch (error) {
      alert('Registration failed: ' + error.response?.data?.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Student Grievance Platform</h1>
        <div className="role-selector">
          <button
            className={role === 'student' ? 'active' : ''}
            onClick={() => setRole('student')}
          >
            Student
          </button>
          <button
            className={role === 'officer' ? 'active' : ''}
            onClick={() => setRole('officer')}
          >
            Officer
          </button>
        </div>

        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleInputChange}
                required
              />
              {role === 'student' && (
                <>
                  <input
                    type="text"
                    name="universityID"
                    placeholder="University ID"
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="collegeName"
                    placeholder="College Name"
                    onChange={handleInputChange}
                    required
                  />
                </>
              )}
              {role === 'officer' && (
                <>
                  <input
                    type="text"
                    name="designation"
                    placeholder="Designation"
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="collegeName"
                    placeholder="College Name"
                    onChange={handleInputChange}
                  />
                </>
              )}
              <input
                type="text"
                name="city"
                placeholder="City"
                onChange={handleInputChange}
                required
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </form>

        <p>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <span onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', color: 'blue' }}>
            {isLogin ? 'Register' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
