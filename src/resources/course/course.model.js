import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
      trim: true
    },
    programName: {
      type: String,
      required: true,
      trim: true
    },
    // subject and semester needs to be referenced from another document as they may be same for various courses
    subject: {
      type: String,
      required: true,
      trim: true
    },
    semester: {
      type: String,
      required: true,
      trim: true
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true
    },
    startDate: {
      type: Date,
      min: new Date()
    }
  },
  { timestamps: true }
);

export const Course = mongoose.model('course', courseSchema);
