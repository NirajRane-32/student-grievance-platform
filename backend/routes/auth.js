const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Officer = require('../models/Officer');

router.post('/register/student', async (req, res) => {
  try {
    const { email, password, universityID, name, collegeName, city } = req.body;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const student = new Student({
      email,
      password,
      universityID,
      name,
      collegeName,
      city,
    });

    await student.save();

    const token = jwt.sign(
      { id: student._id, role: 'student' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(201).json({ token, student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login/student', async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await student.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: student._id, role: 'student' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.json({ token, student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/register/officer', async (req, res) => {
  try {
    const { email, password, name, collegeName, city, designation } = req.body;

    const existingOfficer = await Officer.findOne({ email });
    if (existingOfficer) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const officer = new Officer({
      email,
      password,
      name,
      collegeName,
      city,
      designation,
    });

    await officer.save();

    const token = jwt.sign(
      { id: officer._id, role: 'officer' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(201).json({ token, officer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login/officer', async (req, res) => {
  try {
    const { email, password } = req.body;

    const officer = await Officer.findOne({ email });
    if (!officer) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await officer.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: officer._id, role: 'officer' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.json({ token, officer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
