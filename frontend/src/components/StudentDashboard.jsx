import React, { useEffect, useState } from 'react';
import { dashboardAPI } from '../services/api';
import AnalyticsChart from './AnalyticsChart';
import './StudentDashboard.css';

function StudentDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardAPI.getStats();
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="dashboard">
      <h2>Grievance Analytics Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.totalComplaints}</h3>
          <p>Total Grievances</p>
        </div>
        <div className="stat-card">
          <h3>{stats.pendingComplaints}</h3>
          <p>Pending Cases</p>
        </div>
        <div className="stat-card">
          <h3>{stats.resolvedComplaints}</h3>
          <p>Resolved Cases</p>
        </div>
      </div>
      <AnalyticsChart data={stats} />
    </div>
  );
}

export default StudentDashboard;
