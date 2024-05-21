interface IUser {
    _id: string;
    username: string;
    email: string;
    otpApproved: boolean;
    mylearnings?: string;
    gender: string;
    date_of_birth?: string;
    rating?: number;
    qualifications?: string;
    block: boolean;
    adminApproved: boolean;
  }
export default IUser  