import React, { useState } from 'react';
import { complaintAPI } from '../services/api';
import './ComplaintTracker.css';

function ComplaintTracker() {
  const [referenceID, setReferenceID] = useState('');
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await complaintAPI.getComplaintByID(referenceID);
      setComplaint(response.data);
      setError('');
    } catch (error) {
      setError('Complaint not found');
      setComplaint(null);
    }
  };

  return (
    <div className="tracker">
      <h2>Track Your Complaint</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter Reference ID (e.g., GRV-MUM-2026-00125)"
          value={referenceID}
          onChange={(e) => setReferenceID(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error">{error}</p>}

      {complaint && (
        <div className="complaint-card">
          <h3>{complaint.referenceID}</h3>
          <p><strong>Title:</strong> {complaint.title}</p>
          <p><strong>Status:</strong> <span className={`badge ${complaint.status.toLowerCase()}`}>{complaint.status}</span></p>
          <div className="timeline">
            <h4>Timeline:</h4>
            {complaint.timeline?.map((entry, idx) => (
              <div key={idx} className="timeline-item">
                <p><strong>{entry.status}</strong> - {new Date(entry.updatedAt).toLocaleDateString()}</p>
                <p>{entry.notes}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ComplaintTracker;
