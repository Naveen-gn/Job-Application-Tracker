import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
  },
  status: {
    type: String,
    enum: ['Applied', 'Interviewing', 'Offered', 'Rejected'],
    default: 'Applied',
  },
  dateApplied: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: String,
    trim: true,
  },
});

export default mongoose.model('Job', JobSchema);
