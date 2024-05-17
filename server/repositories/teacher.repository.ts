import mongoose from "mongoose";
import Teachers from "../models/teacher.model";
import ITeacherBody from "../interface/bodies/teacherBody";
import ITeacherRepositoryInterface from "../interface/repositoryInterface/ITeacherRepositoryInterface";



class TeacherRepository implements ITeacherRepositoryInterface {

  async authenticateUser(email:string){
    try{
const teacherDetails =await Teachers.findOne({email:email})
return teacherDetails
    }catch(error){
      throw new Error(`Failed to authenticate teacher: ${error}`);
    }
  }
 
    async teacherSignUp(details: ITeacherBody){
        try{
     const teacherDetails=await Teachers.create(details)
     return teacherDetails;

     
        }catch(error){
        console.log(error)
        throw new Error(`Failed to create user: ${error}`);
         }
    }

    async otpApproval(email: string) {
      try {
        const updatedTeacher = await Teachers.findOneAndUpdate({ email: email }, { $set: { otpApproved: true } }, { new: true });
        return updatedTeacher;
      } catch (error) {
        throw new Error(`Failed to update OTP approval status for teacher: ${error}`);
      }
    }
    

    async checktApproval(email:string){
      try{
    const isApproved = await Teachers.findOne({email:email},{otpApproved:true})
       return isApproved  
      }catch(error){
        throw new Error(`Failed to authenticate teacher: ${error}`);
      }
    }

    async teacherChangePassword(email: string, password: string){
      try {
        const updatedTeacher = await Teachers.findOneAndUpdate({ email: email }, { $set: { password: password } }, { new: true });
        return updatedTeacher;
      } catch (error) {
        throw new Error(`Failed to change password for teacher: ${error}`);
      }
    }
    

     async teacherIdCheck(id:string){
      try{
        console.log("repo")
      const teacherExist= await Teachers.findById(id)
      console.log(teacherExist)
      return teacherExist
    
      }catch(error){
   
        throw new Error(`Failed to fetch teacher data : ${error}`);
      }
    }

    async teacherProfileUpdeate(updateBody:ITeacherBody,id:string){
      try{
        const {username,email,password,profilePic,qualifications,date_of_birth,gender} =updateBody
     
     const  teacherDetails = await Teachers.findByIdAndUpdate({_id:id},{$set:{username:username,email:email,password:password,profilePic:profilePic,qualifications:qualifications,date_of_birth:date_of_birth,gender:gender}},{new:true})
         return teacherDetails
      }catch(error){
        throw new Error(`Failed to update profile : ${error}`);
      }
    }

   async IsBlockTeacher(id:string){
    try{
      const isBlock = await Teachers.findById({_id:id},{block:true});
      return isBlock
    }catch(error){

    }
   }

    async blockTeacher(id:string){
      try{
       
      const isBlock = await Teachers.findByIdAndUpdate({_id:id},{$set:{block:true}},{new:true});
      console.log(isBlock)
      return isBlock;
         
      }catch(error){
        throw new Error(`Failed to block teacher : ${error}`);
      }
    }
    async unblockTeacher(id:string){
      try{
       
      const isBlock = await Teachers.findByIdAndUpdate({_id:id},{$set:{block:false}},{new:true});
      console.log(isBlock)
      return isBlock;
         
      }catch(error){
        throw new Error(`Failed to unblock teacher : ${error}`);
      }
    }
    async disApprovelTeacher(id:string){
      try{
       
      const isApproved= await Teachers.findByIdAndUpdate({_id:id},{$set:{ adminApproved:false}},{new:true});

      return isApproved;
         
      }catch(error){
        throw new Error(`Failed to remove approvel  teacher : ${error}`);
      }
    }
    async approveTeacher(id:string){
      try{
       
      const isApproved= await Teachers.findByIdAndUpdate({_id:id},{$set:{ adminApproved:true}},{new:true});

      return isApproved;
         
      }catch(error){
        throw new Error(`Failed to approve teacher : ${error}`);
      }
    }

    
    async getTeachers() {
      try {
          const teachersDetails= await Teachers.find();
          return   teachersDetails;

      } catch (error) {
          console.error('Error getting teachers:', error);
          throw new Error('Failed to get teachers');
      }
}


async  teacherProfilePicUpload(filePath:string ,id:string){
  try{
  
const updatedPic =  await Teachers.findByIdAndUpdate({_id:id},{$set:{profilePic:filePath }},{new:true})
     return updatedPic 
  }catch(error){
    throw new Error(`Failed to update profile pic : ${error}`);
  }
}

async getTeacherById(id:string) {
  try {
      const student = await Teachers.findById(id);
      return student;
  } catch (error) {
      console.error('Error getting students:', error);
      throw new Error('Failed to get students');
  }
}
}

export default TeacherRepository;
