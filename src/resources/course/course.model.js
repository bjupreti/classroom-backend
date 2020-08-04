import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
      unique: true
    },
    originalName: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    mimeType: {
      required: true,
      type: String
    },
    path: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

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
      ref: 'User',
      required: true
    },
    files: [fileSchema],
    startDate: {
      type: Date,
      min: new Date()
    }
  },
  { timestamps: true }
);

export const Course = mongoose.model('Course', courseSchema);
