import mongoose, { Schema, Document, ObjectId } from 'mongoose';

import ITeacher from '../interface/teacher';

const TeacherSchema: Schema = new Schema({
   username: {
      type: String
  },
  email: {
      type: String
  },
  rating: {
      type: String
  },
  password: {
      type: String
  },
  courses: [{
      type: Schema.Types.ObjectId
  }],
  profilePic: {
      type: String
  },
  block: {
      type: Boolean
  },
  gender: [{
      type: String
  }],
  hire_date: {
      type: Date
  },
  bio: {
      type: String
  },
  employee_id: {
      type: String
  },
  role: {
      type: String
  },
  qualifications: [{
      type: String
  }],
  phone_number: {
      type: String
  },
  otpApproved: {
    type: Boolean, 
    required: true, 
    default: false,
   },
  adminApproved: {
    type: Boolean, 
    required: true, 
    default: false,
   },
   date_of_birth: {
    type: String,
     // required: true 
   },
});

const TeacherModel = mongoose.model<ITeacher>('Teacher', TeacherSchema);

export default TeacherModel;

