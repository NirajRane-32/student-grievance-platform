import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ComplaintForm from '../components/ComplaintForm';
import StudentDashboard from '../components/StudentDashboard';
import ComplaintTracker from '../components/ComplaintTracker';

function StudentPortal() {
  return (
    <Routes>
      <Route path="/" element={<StudentDashboard />} />
      <Route path="/file-complaint" element={<ComplaintForm />} />
      <Route path="/tracker" element={<ComplaintTracker />} />
    </Routes>
  );
}

export default StudentPortal;
