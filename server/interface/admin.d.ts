import { ObjectId } from "mongoose";

interface IAdmin {
  _id: ObjectId;
  username: string | null;
  email: string | null;
  password: string | null;
  profilePic: string | null;
  date_of_birth: Date | null;
  gender: string[] | null;
}
export default IAdmin;
