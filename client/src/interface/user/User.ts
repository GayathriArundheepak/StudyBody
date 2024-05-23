interface IUser {
    _id: string;
    username: string;
    email: string;
    otpApproved: boolean;
    profilePic?: string;
    mylearnings?: string;
    gender: string;
    date_of_birth?: string;
    rating?: number;
    qualifications?: string;
    block: boolean;
    adminApproved: boolean;
    commissionAmount?:number;
  }
export default IUser  