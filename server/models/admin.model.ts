import mongoose, { Schema} from 'mongoose';
import IAdmin from '../interface/admin';
const AdminSchema: Schema = new Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  profilePic: { 
    type: String 
  },
  isAdmin:
   {
     type: Boolean,
     default:false
     },
  // Define other fields here
});

const AdminModel = mongoose.model<IAdmin>('Admin', AdminSchema);

export default AdminModel;

