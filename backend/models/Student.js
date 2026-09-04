const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const StudentSchema = new mongoose.Schema({
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
  universityID: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  collegeName: String,
  city: String,
  role: {
    type: String,
    default: 'student',
    enum: ['student'],
  },
  complaints: [
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

StudentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

StudentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Student', StudentSchema);
