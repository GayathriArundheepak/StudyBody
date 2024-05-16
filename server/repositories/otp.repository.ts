import IOTP from "../interface/otp"
import IOtpRepositoryInterface from "../interface/repositoryInterface/IOtpRepositoryInterface"
import OTP from "../models/otp.model"

class OtpRepository implements IOtpRepositoryInterface{

    async storeOtp(details:IOTP){
        try{
const otpDetails=await OTP.create(details)
return otpDetails
        }catch(error){

        console.log(error)
        throw new Error(`Failed to create otp: ${error}`);
        }
    }
    async checkOtp(details:IOTP){
       try{
       const otpdetails = await OTP.findOne(details)
        return otpdetails 
       }catch(error){
        console.log(error)
        throw new Error(`Failed to fetch otp: ${error}`);
       }
    }

    
    async getHashedOTPByEmail(email: string): Promise<string | null> {
        try {
            // Assuming YourOTPModel represents your OTP entity/model in the database
            const otpRecord = await OTP.findOne({ email: email });

            // If OTP record found, return the hashed OTP
            if (otpRecord && otpRecord.otp) {
                return otpRecord.otp; // Assuming your hashed OTP field is named 'hashedOTP'
            } else {
                return null; // No OTP record found for the provided email
            }
        } catch (error) {
            throw new Error(`Failed to fetch hashed OTP: ${error}`);
        }
    }
    async deleteOtp(email:string){
        try{
          await OTP.deleteMany({email:email})
         
        }catch(error){
            console.log(error)
            throw new Error(`Failed to delete otp: ${error}`);
        }
    }
//     async resendOtp(details:IOTP){
    
//             try{
//     const otpDetails=await OTP.updateOne(details)
//    return otpDetails
// }catch(error){

// }
//     }
}

export default OtpRepository;
