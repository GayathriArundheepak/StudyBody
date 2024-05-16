// import { Document } from "mongoose";
import ICourseBody from "../bodies/courseBody";
import { ICourse } from "../course";

interface ICourseRepositoryInterface {
  createCourse(courseData: ICourseBody, id: string): Promise<any>;
  getCourses(syllabus: string, standard: string): Promise<ICourse[]>;
  getCoursesByTeacher(id: string): Promise<ICourse[]>;
  searchCourse(searchData: string): Promise<ICourse[]>;
  deleteCourse(courseId: string): Promise<any>;
  getCourseByTeacher(id: string): Promise<ICourse[]>;
}

export default ICourseRepositoryInterface;
