import mongoose from "mongoose";

interface IOrder  {
    userId: mongoose.Types.ObjectId;
    courseId: mongoose.Types.ObjectId;
    price: number;
    date?: Date;
}
export default IOrder;