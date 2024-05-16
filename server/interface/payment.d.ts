import { ObjectId } from "mongoose";

interface IPayment {
  _id: ObjectId;
  Order_id: ObjectId | null;
  course_id: ObjectId | null;
  Student_id: ObjectId | null;
  Amount: Number | null;
  Payment_method: String | null;
}
export default IPayment;
