import mongoose, { Schema } from "mongoose";
import IOTP from "../interface/otp";

const OtpSchema: Schema = new Schema({
    email: {
        type: String, 
        required: true,
    },
    otp: {
        type:String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 30 // Expiry time in seconds (60 seconds = 1 minute)
    }
});

const otpModel = mongoose.model<IOTP>('OTP', OtpSchema);

export default otpModel;








































// import mongoose, { Schema } from "mongoose";
// import IOTP from "../interface/otp";


// const OtpSchema: Schema = new Schema({
    
//     email: {
//         type: String, 
//         required: true,
       
//        },
//        otp:{
//         type:Number,
//         required:true
//        }
// });

// const otpModel = mongoose.model<IOTP>('OTP',OtpSchema);

// export default otpModel;