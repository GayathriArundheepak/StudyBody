import mongoose, { Schema, Document, Types } from 'mongoose';
import { ICourse } from '../interface/course';

interface ICommunity extends Document {
  courseId: Types.ObjectId;
  teacher: Types.ObjectId;
  students: Types.ObjectId[];
}

const CommunitySchema = new Schema<ICommunity>({
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student', required: true }]
});

const Community = mongoose.model<ICommunity>('Community', CommunitySchema);

export default Community;
