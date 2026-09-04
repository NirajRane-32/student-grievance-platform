const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const OfficerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
    required: true,
  },
  collegeName: String,
  city: String,
  designation: String,
  role: {
    type: String,
    default: 'officer',
    enum: ['officer', 'admin'],
  },
  assignedComplaints: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Complaint',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

OfficerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

OfficerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Officer', OfficerSchema);
