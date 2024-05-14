


import ICourseBody from '../bodies/courseBody';
import { ICourse } from '../course';

interface ICourseUsecaseInterface {
    createCourse(courseData: ICourseBody, id: string): Promise<{ success: boolean; message: string; newCourse?: ICourse }>;
    getCourses(courseData: ICourseBody): Promise<{ success: boolean, message: string, courseList?: ICourse[] }>;
    getCoursesByTeacher(id: string): Promise<{ success: boolean, message: string, courseList?: ICourse[] }>;
    searchCourse(searchData: string): Promise<{ success: boolean, message: string, courseList?: ICourse[] }>;
    deleteCourse(courseId: string): Promise<ICourse | null>;
    
}

export default ICourseUsecaseInterface;
