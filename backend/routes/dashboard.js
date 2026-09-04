const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Complaint = require('../models/Complaint');

router.get('/stats', protect, async (req, res) => {
  try {
    const totalComplaints = await Complaint.countDocuments();
    const pendingComplaints = await Complaint.countDocuments({
      status: 'Pending',
    });
    const resolvedComplaints = await Complaint.countDocuments({
      status: 'Resolved',
    });

    const categoryBreakdown = await Complaint.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);

    const cityBreakdown = await Complaint.aggregate([
      { $group: { _id: '$city', count: { $sum: 1 } } },
    ]);

    res.json({
      totalComplaints,
      pendingComplaints,
      resolvedComplaints,
      categoryBreakdown,
      cityBreakdown,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/complaints/all', protect, async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .select('-studentID')
      .limit(100);

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
