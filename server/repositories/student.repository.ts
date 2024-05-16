import mongoose from "mongoose";
import IStudent from '../interface/student';
import Students from  '../models/student.model'
import IStudentBody from "../interface/bodies/studentBody";
import IStudentRepositoryInterface from "../interface/repositoryInterface/IStudentRepositoryInterface";

// import studentController from "../controllers/student.controller";



class StudentRepository implements IStudentRepositoryInterface{
    

  async authenticateUser(email:string){
    try{
const studentDetails =await Students.findOne({email:email})
console.log(studentDetails)
return studentDetails
    }catch(error){
      throw new Error(`Failed to authenticate student: ${error}`);
    }
  }
 
    async studentSignUp(details: IStudentBody){
        try{
     const studentDetails=await Students.create(details)
     return studentDetails;

     
        }catch(error){
        console.log(error)
        throw new Error(`Failed to create user: ${error}`);
         }
    }

    async studentChangePassword(email:string,password:string){
      try{
      await Students.findOneAndUpdate({email:email},{$set:{password:password}},{new:true})
         
      }catch(error){
        throw new Error(`Failed to authenticate student: ${error}`);
      }
    }
    async otpApproval(email:string){
      try{
      await Students.findOneAndUpdate({email:email},{$set:{otpApproved:true}},{new:true})
         
      }catch(error){
        throw new Error(`Failed to authenticate student: ${error}`);
      }
    }
    async checktApproval(email: string): Promise<boolean> {
      try {
          const student = await Students.findOne({ email: email }, { otpApproved: true });
          return student !== null && student.otpApproved === true;
      } catch (error) {
          console.error('Error checking approval:', error);
          throw new Error('Failed to check approval');
      }
  }
  
     async studentIdCheck(id:string){
      try{
      const studentExist= await Students.findById(id)
      return studentExist
    
      }catch(error){
   
        throw new Error(`Failed to fetch student data : ${error}`);
      }
    }
   


    async studentProfileUpdeate(updateBody:IStudentBody,id:string){
      try{
        const {username,email,password,profilePic,date_of_birth,gender} =updateBody
      const updated = await Students.findByIdAndUpdate({_id:id},{$set:{username:username,email:email,password:password,profilePic:profilePic,date_of_birth:date_of_birth,gender:gender}},{new:true})
        return updated; 
      }catch(error){
        throw new Error(`Failed to update profile : ${error}`);
      }
    }

  
    async  studentProfilePicUpload(filePath:string ,id:string){
      try{
      
    const updatedPic =  await Students.findByIdAndUpdate({_id:id},{$set:{profilePic:filePath }},{new:true})
         return updatedPic 
      }catch(error){
        throw new Error(`Failed to update profile pic : ${error}`);
      }
    }

    
    async blockStudent(id:string){
      try{
       
      const isBlock = await Students.findByIdAndUpdate({_id:id},{$set:{block:true}},{new:true});
      console.log(isBlock)
      return isBlock;
         
      }catch(error){
        throw new Error(`Failed to block student : ${error}`);
      }
    }
    async unblockStudent(id:string){
      try{
       
      const isBlock = await Students.findByIdAndUpdate({_id:id},{$set:{block:false}},{new:true});
      console.log(isBlock)
      return isBlock;
         
      }catch(error){
        throw new Error(`Failed to unblock student : ${error}`);
      }
    }


    async getStudents() {
      try {
          const students = await Students.find();
          return students;
      } catch (error) {
          console.error('Error getting students:', error);
          throw new Error('Failed to get students');
      }
}
    async getStudentById(id:string) {
      try {
          const student = await Students.findById(id);
          return student;
      } catch (error) {
          console.error('Error getting students:', error);
          throw new Error('Failed to get students');
      }
}


async IsBlockStudent(id:string){
  try{
    const isBlock = await Students.findById({_id:id},{block:true});
    return isBlock
  }catch(error){

  }
 }

 
 async updateStudentMylearning(studentId: string,courseIds:string[]) {
  try {
      // Your logic to update the student's mylearnings array here
      // For example:
      const updatedStudent = await Students.findByIdAndUpdate(
          { _id: studentId },
          { $push: { mylearnings: { $each: courseIds } } },
          { new: true }
      );

      // Return the updated student
      return updatedStudent;
  } catch (error) {
      console.error('Error updating student mylearnings:', error);
      throw new Error('Failed to update student mylearnings');
  }
}
 
 async isCourseInLearnings(studentId: any, courseId: any) {
  try {
    // Find the student document by ID
    const student = await Students.findById(studentId);
    if (!student) {
      throw new Error('Student not found');
    }

    if (student.mylearnings) {
      // Check if the course ID exists in the mylearnings array of the student
      return student.mylearnings.includes(courseId);
    } else {
      // If mylearnings is null, the course cannot exist in it
      return false;
    }
  } catch (error) {
    // Handle errors or log them
    console.error('Error checking course in learnings:', error);
    return false; // Return false if an error occurs
  }
}
async getMyLearningCourses(studentId: string) {
  try {
    const student = await Students.findById(studentId).populate({
      path: 'mylearnings',
      options: { lean: true } // Use lean() to get plain JavaScript objects
    });
    if (student) {
      console.log(student.mylearnings)
      return student.mylearnings; // Return populated courses from My Learning
    } else {
      return null;
    }
  } catch (error) {
    throw new Error('Failed to get My Learning courses');
  }
}
async getUsers(skip: number, limit: number) {
  try {
      // Perform database query to fetch users data with pagination
      const users = await Students.find().skip(skip).limit(limit);
      console.log(users)
      return users;
  } catch (error) {
      console.log(error);
      throw new Error(`Failed to fetch users: ${error}`);
  }
}
}

export default StudentRepository;
