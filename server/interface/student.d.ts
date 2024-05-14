import mongoose, {ObjectId}  from "mongoose"; 


interface IStudent{

    
        _id: ObjectId;

        profilePic: string | null;


        wishlist: mongoose.Types.ObjectId[] | null;

        username: string;

        email: string;

        cart:mongoose.Types.ObjectId[] | null;

        block: Boolean , default:false;

        password: string;

        review: string | null;

        mylearnings: ObjectId[] | null;

        // Student_id: string;
        gender: string[] | null;

        date_of_birth: Date | null;
        
        otpApproved: boolean;
      
}
export default IStudent;