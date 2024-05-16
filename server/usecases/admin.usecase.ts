import AdminRepository from "../repositories/admin.repository"
import StudentRepository from "../repositories/student.repository";
import TeacherRepository from './../repositories/teacher.repository';
import IAdminUsecaseInterface from "../interface/usecaseInterface/IAdminUsecaseInterface";
import IAdminBody from "../interface/bodies/adminBody";
import bcrypt from "bcrypt";
import CourseRepository from "../repositories/course.repository";

class AdminUsecase implements IAdminUsecaseInterface{
    private adminRepository: AdminRepository;
    private studentRepository: StudentRepository;
    private teacherRepository: TeacherRepository;
    private courseRepository: CourseRepository;
            
            constructor(adminRepository:AdminRepository,
                studentRepository:StudentRepository,
                teacherRepository: TeacherRepository,
                courseRepository: CourseRepository,
                ){
                this.adminRepository=adminRepository,
                this.studentRepository=studentRepository;
                this.teacherRepository=teacherRepository;
                this.courseRepository=courseRepository;
                
    }
            
 // student managenent
      // block student
    async blockUser(id:string,userType:string){
        try{
            if(userType==='student'){
    
                const studentExist=await this.studentRepository.studentIdCheck(id);
                if(studentExist){
    
                    const IsBlockStudent=await this.studentRepository.blockStudent(id)
                    
            
                        return {
                            success:true,
                            message:"student blocked success"
                          
                        }
                
                }else{
                    return {
                        success:false,
                        message:"student not exist"
                    }
                }
            }else if(userType==='teacher'){
                const teacherExist=await this.teacherRepository.teacherIdCheck(id);
                if(teacherExist){
    
                    const IsBlockTeacher=await this.teacherRepository.blockTeacher(id)
                    
            
                        return {
                            success:true,
                            message:"teacher blocked success"
                          
                        }
                
                }else{
                    return {
                        success:false,
                        message:"teacher not exist"
                    }
                }
            }else{
                return {
                    success:false,
                    message:"user not exist"
                }
            }

        }catch(error){
            console.log(error)
          
             throw new Error(`Failed to execute block student :${error}`)
        }
    }
     // unblock student
    async unblockUser(id:string,userType:string){
        try{
if(userType==='student'){
    const studentExist=await this.studentRepository.studentIdCheck(id);
    if(studentExist){
    
        await this.studentRepository.unblockStudent(id)
             return {
                 success:true,
                 message:"student unblocked success"
             }
     
    }else{
        return {
            success:false,
            message:"student not exist"
        }
    }
}else if(userType === 'teacher'){
    const teacherExist=await this.teacherRepository.teacherIdCheck(id);
    if(teacherExist){
    
        await this.teacherRepository.unblockTeacher(id)
             return {
                 success:true,
                 message:"teacher unblocked success"
             }
     
    }else{
        return {
            success:false,
            message:"teacher not exist"
        }
    }
}else{
    return {
        success:false,
        message:"user not exist"
    }
}


        }catch(error){
            console.log(error)
          
             throw new Error(`Failed to execute unblock teacher :${error}`)
        }
    }
    
    
 
    async approveTeacher(id:string){
        try{
      
         
                const teacherExist=await this.teacherRepository.teacherIdCheck(id);
                if(teacherExist){
    
                    const IsapprovedTeacher=await this.teacherRepository.approveTeacher(id)
                    
            
                        return {
                            success:true,
                            message:"teacher approved successfully"
                          
                        }
                
                }else{
                    return {
                        success:false,
                        message:"teacher not exist"
                    }
                }
          

        }catch(error){
            console.log(error)
          
             throw new Error(`Failed to execute block student :${error}`)
        }
    }
    

   
    async disApproveTeacher(id:string){
        try{


    const teacherExist=await this.teacherRepository.teacherIdCheck(id);
    if(teacherExist){
    
        await this.teacherRepository.disApprovelTeacher(id)
             return {
                 success:true,
                 message:"teacher removed successfully"
             }
     
    }else{
        return {
            success:false,
            message:"teacher not exist"
        }
    }



        }catch(error){
            console.log(error)
          
             throw new Error(`Failed to execute unblock teacher :${error}`)
        }
    }
    
    
    async adminProfileUpdeate(body:IAdminBody,id:string){
        try{
           console.log(id)
           console.log(body)
           const adminExist=await this.adminRepository.adminIdCheck(id);
           
           if(adminExist){
                     const   password=body.password

                //      const hashedPassword:string = await  bcrypt.hash(password as string, 10);
                //   const updateBody:IadminBody={...body,password:hashedPassword}
                //   await this.adminRepository.adminProfileUpdeate(updateBody,id);
                  
                //             return {
                //         success:true,
                //         message:"profile updated",
                       
                //         }
                if(password){

                    const hashedPassword:string = await  bcrypt.hash(password as string, 10);
                 const updateBody:IAdminBody={...body,password:hashedPassword}
                 await this.adminRepository.adminProfileUpdeate(updateBody,id);
                 return {
                     success:true,
                     message:"profile updated",
                    
                     }
                }else{
                    const { password, ...updateBody } = body; 
                const adminDetails = await this.adminRepository.adminProfileUpdeate(updateBody,id);
                if(adminDetails){

                    
                         return {
                     success:true,
                     message:"profile updated",
                     data:adminDetails
                }
               
                }else{
                    return {
                        success:false,
                        message:"this user does not exist 1"
                    }
                }
                }
                    }else{
                        return {
                            success:false,
                            message:"this user does not exist 1"
                        }
        
                    }
        
        }catch(error){
            console.log(error)
          
               throw new Error(`Failed to execute admin sign-up:${error}`)
            }
            
        }


}
export default AdminUsecase;