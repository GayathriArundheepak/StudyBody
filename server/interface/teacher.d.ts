import  { ObjectId } from 'mongoose';

export interface ITeacher {
  _id: ObjectId;
  teacherName: String | null;
  email: String | null;
  rating: String | null;
  password: String | null;
  courses: ObjectId[] | null;
  profilePic: String | null;
  block: Boolean | null;
  gender: String[] | null;
  hire_date: Date | null;
  bio: String | null;
  employee_id: String | null;
  role: String | null;
  qualifications: String[] | null;
  phone_number: String | null;
  
}

export default ITeacher;
