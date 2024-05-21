import Course from "./Course";

export default interface ICourseResponse {
  success: boolean;
  message: string;
  courseList: Course[];
}
