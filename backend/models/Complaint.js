const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  referenceID: {
    type: String,
    unique: true,
    required: true,
  },
  studentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  title: String,
  description: String,
  category: {
    type: String,
    enum: [
      'Academic',
      'Administrative',
      'Infrastructure',
      'Safety',
      'Sanitation',
      'Accessibility',
      'Harassment',
      'Other',
    ],
  },
  severity: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium',
  },
  location: String,
  city: String,
  collegeName: String,
  status: {
    type: String,
    enum: ['Pending', 'In Review', 'Escalated', 'Resolved'],
    default: 'Pending',
  },
  aiStructuredData: {
    extractedFacts: [String],
    suggestedCategory: String,
    missingInfo: [String],
    summary: String,
  },
  evidence: [
    {
      fileURL: String,
      fileType: String,
      uploadedAt: Date,
    },
  ],
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Officer',
  },
  timeline: [
    {
      status: String,
      updatedAt: Date,
      notes: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
