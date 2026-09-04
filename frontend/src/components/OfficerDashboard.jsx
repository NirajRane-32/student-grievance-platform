import React, { useEffect, useState } from 'react';
import { dashboardAPI } from '../services/api';
import { subscribeToUpdates, joinComplaintRoom } from '../services/socket';
import './OfficerDashboard.css';

function OfficerDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await dashboardAPI.getAllComplaints();
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };
    fetchComplaints();

    subscribeToUpdates((data) => {
      console.log('✅ Live Update:', data);
    });
  }, []);

  const handleSelectComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    joinComplaintRoom(complaint._id);
  };

  return (
    <div className="officer-dashboard">
      <h2>Officer Dashboard</h2>
      <div className="complaints-container">
        <div className="complaints-list">
          {complaints.map((complaint) => (
            <div
              key={complaint._id}
              className="complaint-item"
              onClick={() => handleSelectComplaint(complaint)}
            >
              <p><strong>{complaint.referenceID}</strong></p>
              <p>{complaint.title}</p>
              <p className={`status ${complaint.status.toLowerCase()}`}>
                {complaint.status}
              </p>
            </div>
          ))}
        </div>

        {selectedComplaint && (
          <div className="complaint-details">
            <h3>Complaint Details</h3>
            <p><strong>Reference ID:</strong> {selectedComplaint.referenceID}</p>
            <p><strong>Title:</strong> {selectedComplaint.title}</p>
            <p><strong>Description:</strong> {selectedComplaint.description}</p>
            <p><strong>Category:</strong> {selectedComplaint.category}</p>
            <p><strong>Status:</strong> {selectedComplaint.status}</p>
            <p><strong>AI Summary:</strong> {selectedComplaint.aiStructuredData?.summary}</p>
            <p><strong>Missing Info:</strong> {selectedComplaint.aiStructuredData?.missingInfo?.join(', ')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OfficerDashboard;
