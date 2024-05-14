import bcrypt from "bcrypt";
import StudentRepository from '../repositories/student.repository';
import IStudentBody from '../interface/bodies/studentBody';
import multer from 'multer';
import IStudentUsecaseInterface from "../interface/usecaseInterface/IStudentUsecaseInterface";



class StudentUsecase implements IStudentUsecaseInterface {
    private studentRepository: StudentRepository;
    

    constructor(studentRepository: StudentRepository ) {
        this.studentRepository = studentRepository;
     
    }


    async studentProfileUpdeate(body:IStudentBody,id:string){
        try{
           console.log(id)
           console.log(body)
          
           const   password=body.password
             const studentExist=await this.studentRepository.studentIdCheck(id);
                 if(studentExist){
              
                if(password){

                    const hashedPassword:string = await  bcrypt.hash(password as string, 10);
                 const updateBody:IStudentBody={...body,password:hashedPassword}
               const updatedDetails=  await this.studentRepository.studentProfileUpdeate(updateBody,id);
               console.log(updatedDetails)
               if(updatedDetails){

                   return {
                       success:true,
                       message:"profile updated",
                       updatedDetails
                      
               }
                     }else{
                        return {
                            success:false,
                            message:"profile not updated",
    
                    }

                     }
                }else{
                    console.log('body',body)
                    const { password, ...updateBody } = body; 
                  const updatedDetails=  await this.studentRepository.studentProfileUpdeate(updateBody,id);
                  console.log('updatedDetails',updatedDetails)
                  if(updatedDetails){

                      return {
                  success:true,
                  message:"profile updated",
                  updatedDetails,
                 
                  }
                  }else{
                    return {
                        success:false,
                        message:"profile not updated",
                       
                       
                }
                  }
                }
                    }else{
                        return {
                            success:false,
                            message:"this user des not exist"
                        }
        
                    }
        
        }catch(error){
            console.log(error)
          
               throw new Error(`Failed to execute student sign-up:${error}`)
            }
            
        }

        async getStudents(){
            try {
                console.log('haii getstudent usecase')
                const students =  await this.studentRepository.getStudents()
                
                console.log(students)
                if (students) {
                   return{
                        success: true,
                        message: 'Students  found',
                        data: students
                    };
                } else {
                  return  {
                        success: false,
                        message: 'Students not found'
                    };
                }
            } catch (error) {

                return  {
                    success: false,
                    message: 'Students not found'
                };
                // throw new Error('Failed to get student');
            }
        }

        async getStudentById(id: string) {
            try {
              const student = await this.studentRepository.getStudentById(id);
              if (student) {
                return {
                  success: true,
                  message: 'Student found',
                  data: student
                };
              } else {
                return {
                  success: false,
                  message: 'Student not found'
                };
              }
            } catch (error) {
              console.error('Error getting student:', error);
              return {
                success: false,
                message: 'Failed to get student'
              };
            }
          }

        async studentProfilePicUpload( file: Express.Multer.File,id:string ){
            try{
             if(!file){
                return{
                    success: false, message: 'No file recived'
                }
             }

             const filePath =`/images/${file.fieldname}`;
             const studentExist=await this.studentRepository.studentIdCheck(id);
             
             if(studentExist){
               const updatedPic = await this.studentRepository.studentProfilePicUpload(filePath ,id);
               console.log(`updatedPIc ${updatedPic}` )
              if(updatedPic ){

                  return {
              success:true,
              message:"profile pic updated",
              }
                   
                    }else{
                        return{
                            success: false, message: 'cant update pic'
                        } 
                    }
             }else{
                return{
                    success: false, message: 'you not autherized to change '
                }
             }
           
            }catch(error){
                console.error(error);
                return{
                    success: false, message: 'Server error'
                }
            }

        }  

        async updateStudentMylearning(studentId:string,courseIds:string[]) {
            try {
                const updatedStudent = await this.studentRepository.updateStudentMylearning(studentId,courseIds);
                console.log(updatedStudent)
                if(updatedStudent){
                    return{
                        success:true,
                        message:'Updated Mylearning successfully',
                        updatedStudent
                    }
                    }else{
                        return{
                            success:false,
                            message:'Updating Mylearning got failed some issuses',
                            updatedStudent
                        }
                    }
                
                
            } catch (error) {
                console.error('Error updating student mylearnings:', error);
                throw new Error('Failed to update student mylearnings');
            }
        }
        // usecases/student.usecase.ts


  async getMyLearningCourses(studentId: string) {
    try {
      const courses = await this.studentRepository.getMyLearningCourses(studentId);
      if (courses) {
        return { success: true, message: 'My Learning courses found', data: courses };
      } else {
        return { success: false, message: 'My Learning courses not found' };
      }
    } catch (error) {
      throw new Error('Failed to get My Learning courses');
    }
  }

 
   
  async getUsers(skip:number,limit:number) {
    try {
        // Fetch users data based on pagination parameters
        const users = await this.studentRepository.getUsers(skip, limit);

    if(users){
        return{

            success: true,
            message: "Users fetched successfully",
            data: users
        }
    }else{
        return{

            success: false,
            message: "Users fetching failed",
            
        }
    }
 
    } catch (error) {
        console.log(error)
  
        throw new Error(`Failed to get users:${error}`) 
    }
}
        
    }
    
export default StudentUsecase;





















//     async userProfileUpdate(body: IStudentBody | ITeacherBody, id: string) {
  
//         try{
//             let user;
//             let userType;
//            if (body.userType==='student') {
//                user = await this.studentRepository.studentIdCheck(id);
//                userType = 'student';
//            } else if(body.userType==='student') {
//            user = await this.teacherRepository.teacherIdCheck(id);
//                userType = 'teacher';
//            }else{
//                // user = await this.adminRepository.authenticateAdmin(body.email);
//                // userType = 'admin'; 
//            }
//            if(user && typeof body.password === 'string'){
            
//                const hashedPassword:string = await  bcrypt.hash(body.password as string, 10);
//                const updateBody={...body,password:hashedPassword}
//                 userType==='student' && await this.studentRepository.studentProfileUpdeate(updateBody,id)
//                 userType==='student' && await this.teacherRepository.teacherProfileUpdeate(updateBody,id);
//            }
//            if(body.userType==="student"){
//             //  const studentExist=await this.studentRepository.studentIdCheck(id);
//             //      if(studentExist){
//             //              const updateBody={...body,password:hashedPassword}
//             //              await this.studentRepository.studentProfileUpdeate(updateBody,id);
                         
//             //                        return {
//             //                    success:true,
//             //                    message:"profile updated",
                              
//             //                    }
//             //          }
//                     }else{
//                         return {
//                             success:false,
//                             message:"this user des not exist"
//                         }
        
//                     }
        
//         }catch(error){
//             console.log(error)
          
//                throw new Error(`Failed to execute student sign-up:${error}`)
//             }
            
//         }
 

