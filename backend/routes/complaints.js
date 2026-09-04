const express = require('express');
const router = express.Router();
const { protect, authorizeRole } = require('../middleware/auth');
const Complaint = require('../models/Complaint');
const { generateReferenceID } = require('../utils/referenceIdGenerator');
const { structureComplaint } = require('../utils/aiProcessor');

router.post('/', protect, async (req, res) => {
  try {
    const { title, description, category, location, city, collegeName } = req.body;

    const referenceID = generateReferenceID();
    const aiStructuredData = await structureComplaint(description, category);

    const complaint = new Complaint({
      referenceID,
      studentID: req.user.id,
      title,
      description,
      category,
      location,
      city,
      collegeName,
      aiStructuredData,
    });

    await complaint.save();

    res.status(201).json({
      message: 'Complaint filed successfully',
      referenceID,
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:referenceID', protect, async (req, res) => {
  try {
    const complaint = await Complaint.findOne({
      referenceID: req.params.referenceID,
    }).populate('studentID', 'name collegeName city');

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', protect, async (req, res) => {
  try {
    const complaints = await Complaint.find({ studentID: req.user.id });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', protect, authorizeRole(['officer', 'admin']), async (req, res) => {
  try {
    const { status, notes } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status, $push: { timeline: { status, updatedAt: Date.now(), notes } } },
      { new: true }
    );

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
