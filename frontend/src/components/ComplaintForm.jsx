import React, { useState } from 'react';
import { complaintAPI } from '../services/api';
import './ComplaintForm.css';

function ComplaintForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Academic',
    location: '',
    city: '',
    collegeName: '',
  });

  const [referenceID, setReferenceID] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await complaintAPI.fileComplaint(formData);
      setReferenceID(response.data.referenceID);
      alert(`✅ Complaint filed! Reference ID: ${response.data.referenceID}`);
      setFormData({
        title: '',
        description: '',
        category: 'Academic',
        location: '',
        city: '',
        collegeName: '',
      });
    } catch (error) {
      alert('❌ Error filing complaint: ' + error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="complaint-form">
      <h2>File a New Complaint</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Complaint Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Describe your complaint in detail..."
          value={formData.description}
          onChange={handleChange}
          required
          rows="6"
        ></textarea>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option>Academic</option>
          <option>Administrative</option>
          <option>Infrastructure</option>
          <option>Safety</option>
          <option>Sanitation</option>
          <option>Accessibility</option>
          <option>Harassment</option>
          <option>Other</option>
        </select>

        <input
          type="text"
          name="location"
          placeholder="Location of Incident"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="collegeName"
          placeholder="College Name"
          value={formData.collegeName}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'File Complaint'}
        </button>
      </form>

      {referenceID && (
        <div className="success-box">
          <p>✅ Your complaint has been filed successfully!</p>
          <p><strong>Reference ID:</strong> {referenceID}</p>
          <p>Save this ID to track your complaint status.</p>
        </div>
      )}
    </div>
  );
}

export default ComplaintForm;
