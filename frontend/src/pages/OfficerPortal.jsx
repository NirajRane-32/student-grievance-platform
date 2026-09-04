import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OfficerDashboard from '../components/OfficerDashboard';

function OfficerPortal() {
  return (
    <Routes>
      <Route path="/" element={<OfficerDashboard />} />
    </Routes>
  );
}

export default OfficerPortal;
