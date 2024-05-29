import mongoose, { Schema} from 'mongoose';
import IStudent from '../interface/student';

const StudentSchema: Schema = new Schema({
  profilePic: {
     type: String, 
 
     },
 
  wishlist: [{ 
    type: Schema.Types.ObjectId,
    ref: 'Course' // Reference to the Course model
}],
  username: 
  { type: String, 
    required: true,
    //  unique: true 
  },
  email: {
     type: String, 
     required: true,
      unique: true 
    },
  cart: [{
     type: Schema.Types.ObjectId,
     ref:'Course',

    }],
  block: { 
    type: Boolean,
     required: true,
     default:false,
   },
  password: {
     type: String,
      required: true, 
  
     },
 
  review: 
  { type: String
   },
  mylearnings: [{ 
    type: Schema.Types.ObjectId, required: true, ref: 'Course' 
    }],
  otpApproved: {
     type: Boolean, 
     required: true, 
     default: false,
    },
  gender: { 
    type: String,  
   },
  date_of_birth: {
     type: String,
      // required: true 
    },
});

const StudentModel = mongoose.model<IStudent>('Student', StudentSchema);

export default StudentModel;

