import IOTP from '../otp'

interface IOtpRepositoryInterface {
    storeOtp(details: IOTP): Promise<any>; // Adjust the return type as per your implementation
    checkOtp(details: IOTP): Promise<any | null>; // Adjust the return type as per your implementation
    deleteOtp(email: string): Promise<void>;
    // resendOtp(details: IOTP): Promise<void>;
}

export default IOtpRepositoryInterface;

