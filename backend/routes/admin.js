const express = require('express');
const router = express.Router();
const { protect, authorizeRole } = require('../middleware/auth');
const Officer = require('../models/Officer');
const Complaint = require('../models/Complaint');

router.get('/officers', protect, authorizeRole(['admin']), async (req, res) => {
  try {
    const officers = await Officer.find().select('-password');
    res.json(officers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/stats', protect, authorizeRole(['admin']), async (req, res) => {
  try {
    const totalComplaints = await Complaint.countDocuments();
    const resolvedComplaints = await Complaint.countDocuments({
      status: 'Resolved',
    });
    const pendingComplaints = await Complaint.countDocuments({
      status: 'Pending',
    });
    const investigatingComplaints = await Complaint.countDocuments({
      status: 'In Review',
    });

    const categoryBreakdown = await Complaint.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const collegeBreakdown = await Complaint.aggregate([
      { $group: { _id: '$collegeName', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    res.json({
      totalComplaints,
      resolvedComplaints,
      pendingComplaints,
      investigatingComplaints,
      categoryBreakdown,
      collegeBreakdown,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/assign-complaint', protect, authorizeRole(['admin']), async (req, res) => {
  try {
    const { complaintID, officerID } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      complaintID,
      { assignedTo: officerID },
      { new: true }
    );

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/complaint/:id', protect, authorizeRole(['admin', 'officer']), async (req, res) => {
  try {
    const { status, notes } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        status,
        $push: { timeline: { status, updatedAt: Date.now(), notes } },
      },
      { new: true }
    );

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
