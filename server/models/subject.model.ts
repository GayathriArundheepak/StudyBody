import mongoose, { Schema } from 'mongoose';

interface ISubject extends mongoose.Document {
  syllabus: string;
  standard: string;
  subject: string;
}

const SubjectSchema: Schema = new Schema({
  syllabus: {
    type: String,
    required: true,
  },
  standard: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
});

const Subject = mongoose.model<ISubject>('Subject', SubjectSchema);

export default Subject;
