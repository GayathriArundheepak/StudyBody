import Course from "./Course";

export default interface CourseResponse {
  success: boolean;
  message: string;
  courseList: Course[];
}
