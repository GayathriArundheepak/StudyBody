import mongoose, { Schema} from 'mongoose';
import IPayment from '../interface/payment';

const PaymentSchema: Schema = new Schema({
  Order_id: { type: Schema.Types.ObjectId , ref:'Order',},
  course_id: { type: Schema.Types.ObjectId , ref:'Course',},
  Student_id: { type: Schema.Types.ObjectId,  ref:'Student', },
  Amount: { type: Number },
  Payment_method: { type: String },
});

const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);

export default Payment;
