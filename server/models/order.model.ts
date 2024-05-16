import mongoose, { Schema, Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import IOrder from '../interface/order';

interface IOrderModel extends IOrder, Document {}

const orderSchema: Schema = new Schema({
    studentId: { type: mongoose.Types.ObjectId, ref: "Student", required: true },
    courseId: [{ type: mongoose.Types.ObjectId, ref: "Course", required: true }],
    price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    paymentDone: { type: Boolean, default: false },
});

const Order = mongoose.model<IOrderModel>('Order', orderSchema);

export default Order;


