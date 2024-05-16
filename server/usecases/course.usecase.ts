import CourseRepository from "../repositories/course.repository";
import ICourseBody from "../interface/bodies/courseBody";
import ICourseUsecaseInterface from "../interface/usecaseInterface/ICourseUsecaseInterface ";
import Course from "./../models/course.model";
import { ICourse, IMaterials } from "../interface/course";
import { IReviewBody } from "../interface/bodies/reviewBody";
import mongoose, { ObjectId } from "mongoose";
import ConversationRepository from "../repositories/conversation.repository";

 interface IReview {
    comment: string;
    studentId: string; // Assuming studentId is a string
    // You can include additional fields if needed, such as timestamp, rating, etc.
  }
class CourseUsecase implements ICourseUsecaseInterface {
  private _courseRepository: CourseRepository;
  private _conversationRepository: ConversationRepository;

  constructor(
    _courseRepository: CourseRepository,
    _conversationRepository: ConversationRepository
  ) {
    this._courseRepository = _courseRepository;
    this._conversationRepository = _conversationRepository;
  }
  async createCourse(courseData: ICourseBody, id: string) {
    try {
      // Check if a course with the same course_title already exists
      const existingCourse = await this._courseRepository.findCourseByTitle(
        courseData.course_title
      );
      if (existingCourse) {
        return {
          success: false,
          message: "Course with the same title already exists",
        };
      }

      // If no course with the same title exists, proceed to create the new course
      const newCourse: ICourse = await this._courseRepository.createCourse(
        courseData,
        id
      );
      if (newCourse) {
        // Assign studentsIds to newCourse.students_list or default to an empty array if newCourse.students_list is null or undefined
        const studentsIds: ObjectId[] = newCourse?.students_list ?? [];
        const conversation =
          await this._conversationRepository.createNewCommunity(
            id,
            courseData.course_title,
            studentsIds
          );
        // Update the new course with the community ID
        const updatedCourse = await Course.findOneAndUpdate(
          { _id: newCourse._id },
          { community: conversation._id }, // Assuming the conversation object has an _id field
          { new: true }
        );
      }
      return {
        success: true,
        message: "courses created sucessfully",
        newCourse,
      };
    } catch (error) {
      console.error("Error creating course:", error);
      throw new Error(`Failed to create course: ${error}`);
    }
  }

  async updateCourse(courseData: ICourseBody, id: string, courseId: string) {
    try {
      // If no course with the same title exists, proceed to create the new course
      const updatedCourse = await this._courseRepository.editCourse(
        courseData,
        id,
        courseId
      );
      return {
        success: true,
        message: "courses updated sucessfully",
        updatedCourse,
      };
    } catch (error) {
      console.error("Error creating course:", error);
      throw new Error(`Failed to create course: ${error}`);
    }
  }

  async getCourses(courseData: ICourseBody) {
    try {
      console.log("Fetching courses by syllabus and class");
      const { syllabus, standard }: { syllabus: string; standard: string } =
        courseData;

      const courseList = await this._courseRepository.getCourses(
        syllabus,
        standard
      );

      if (courseList) {
        return {
          success: true,
          message: "courses fetched",
          courseList,
        };
      } else {
        return {
          success: false,
          message: "Courses not found",
        };
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      return {
        success: false,
        message: "Failed to fetch courses",
        data: [],
      };
    }
  }

  async getCoursesByTeacher(id: string) {
    try {
      console.log("Fetching courses by syllabus and class");

      const courseList = await this._courseRepository.getCoursesByTeacher(id);

      if (courseList) {
        return {
          success: true,
          message: "courses fetched",
          courseList,
        };
      } else {
        return {
          success: false,
          message: "Courses not found",
        };
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      return {
        success: false,
        message: "Failed to fetch courses",
        data: [],
      };
    }
  }
  async getCoursesById(id: string) {
    try {
      console.log(id);
      const courseList = await this._courseRepository.findCourseById(id);
      if (courseList) {
        return {
          success: true,
          message: "courses fetched",
          courseList,
        };
      } else {
        return {
          success: false,
          message: "Courses not found",
        };
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      return {
        success: false,
        message: "Failed to fetch courses",
        data: [],
      };
    }
  }

  async searchCourse(searchData: string) {
    try {
      const filteredCourses: ICourse[] =
        await this._courseRepository.searchCourse(searchData);

      if (filteredCourses && filteredCourses.length > 0) {
        return {
          success: true,
          message: "Courses found",
          courseList: filteredCourses,
        };
      } else {
        return {
          success: false,
          message: "No courses found",
          courseList: [],
        };
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      return {
        success: false,
        message: "Failed to fetch courses",
        courseList: [],
      };
    }
  }

  async filterCourse(searchData: string) {
    try {
      const filteredCourses: ICourse[] =
        await this._courseRepository.filterCourse(searchData);
      if (filteredCourses && filteredCourses.length > 0) {
        return {
          success: true,
          message: "Courses found",
          filteredCourses,
        };
      } else {
        return {
          success: false,
          message: "No courses found",
        };
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      return {
        success: false,
        message: "Failed to fetch courses",
      };
    }
  }

  async deleteCourse(courseId: string) {
    try {
      const deletedCourse = await this._courseRepository.deleteCourse(courseId);
      return deletedCourse;
    } catch (error) {
      console.error("Error deleting course:", error);
      throw new Error(`Failed to delete course: ${error}`);
    }
  }

  async updateCourseStudentsList(courseId: string[], studentId: string) {
    try {
      const courseDetails =
        await this._courseRepository.updateCourseStudentsList(
          courseId,
          studentId
        );

      if (courseDetails) {
        for (const id of courseId) {
          const course = await this._courseRepository.findCourseById(id);

          if (course) {
            // Retrieve the community ID from the course details
            const communityId = course.community;

            // Add the new student ID to the conversation's members
            await this._conversationRepository.addMemberToConversation(
              communityId,
              studentId
            );
          }
        }

        return {
          success: true,
          message: "Course students list updated successfully",
          courseDetails: courseDetails,
        };
      } else {
        return {
          success: false,
          message: "Course students list updation got  failed",
          courseDetails,
        };
      }
    } catch (error) {
      return { success: false, message: "Error updating course students list" };
    }
  }

  async createReview(courseId: string, reviewData: IReviewBody) {
    try {
      console.log("haii");
      // Check if the course exists
      const existingCourse = await this._courseRepository.findCourseById(
        courseId
      );
      console.log(existingCourse);
      console.log("haiie");
      if (!existingCourse) {
        return {
          success: false,
          message: "Course not found",
        };
      }

      // Check if the studentId exists in the studentList of the course
      // if (!existingCourse.studentList || !existingCourse.studentList.includes(reviewData.studentId)) {
      //     return {
      //         success: false,
      //         message: 'Student not enrolled in this course',
      //     };
      // }

      // Create the review object
      const newReview: IReview = {
        comment: reviewData.comment,
        studentId: reviewData.studentId,
      };

      // Add the review to the course
      const updatedCourse = await this._courseRepository.addReviewToCourse(
        courseId,
        newReview
      );
      console.log(updatedCourse);
      if (updatedCourse) {
        return {
          success: true,
          message: "Review created successfully",
          updatedCourse,
        };
      } else {
        return {
          success: false,
          message: "Review creation failed",
        };
      }
    } catch (error) {
      console.error("Error creating review:", error);
      throw new Error(`Failed to create review: ${error}`);
    }
  }
  async addMaterials(
    courseId: string,
    teacherId: string,
    materials: IMaterials // Use the Materials interface here
  ) {
    // Function implementation

    try {
      // Check if the course exists
      const existingCourse = await this._courseRepository.findCourseById(
        courseId
      );
      if (!existingCourse) {
        return { success: false, message: "Course not found." };
      }
      // Check if the teacher has permission to add materials
      if (existingCourse.teacher_id.toString() !== teacherId) {
        return {
          success: false,
          message:
            "Unauthorized access. You are not the teacher of this course.",
        };
      }

      // Add materials to the course

      const updatedCourse = await this._courseRepository.updateCourse(
        courseId,
        materials
      );
      console.log(updatedCourse);
      if (!updatedCourse) {
        return { success: false, message: "Materials added  failed" };
      }
      return {
        success: true,
        message: "Materials added successfully.",
        updatedCourse,
      };
    } catch (error) {
      console.error("Error adding materials:", error);
      throw new Error(`Failed to add materials: ${error}`);
    }
  }
  async getMaterials(courseId: string) {
    try {
      // Fetch the course by its ID
      const materials: any =
        await this._courseRepository.findMaterialsByCourseId(courseId);
      console.log(materials);
      if (materials && materials.length > 0) {
        const { _id, materials: extractedMaterials } = materials[0];
        // Return the materials associated with the course if it exists
        return {
          success: true,
          message: "Materials found",
          materials: extractedMaterials,
        };
      } else {
        return {
          success: false,
          message: "No materials found for the provided course ID.",
        };
      }
    } catch (error) {
      console.error("Error fetching materials:", error);
      throw new Error(`Failed to fetch materials: ${error}`);
    }
  }

  async approveCourse(id: string) {
    try {
      const courseExist = await this._courseRepository.findCourseById(id);
      if (courseExist) {
        const Isapprovedcourse = await this._courseRepository.approveCourse(id);

        return {
          success: true,
          message: "teacher approved successfully",
          Isapprovedcourse,
        };
      } else {
        return {
          success: false,
          message: "teacher not exist",
        };
      }
    } catch (error) {
      console.log(error);

      throw new Error(`Failed to execute block student :${error}`);
    }
  }
  async disApproveCourse(id: string) {
    try {
      const courseExist = await this._courseRepository.findCourseById(id);
      if (courseExist) {
        const Isapprovedcourse = await this._courseRepository.disApproveCourse(
          id
        );
        return {
          success: true,
          message: "teacher approved successfully",
          Isapprovedcourse,
        };
      } else {
        return {
          success: false,
          message: "teacher not exist",
        };
      }
    } catch (error) {
      console.log(error);

      throw new Error(`Failed to execute block student :${error}`);
    }
  }

  async addSubject(
    syllabus: string,
    standard: string,
    subject: string
  ): Promise<any> {
    try {
      // Check if the subject already exists for the provided syllabus and standard
      const existingSubject = await this._courseRepository.getSubjectByCriteria(
        syllabus,
        standard,
        subject
      );

      if (existingSubject) {
        return {
          success: false,
          message: "Subject already exists for the provided criteria",
        };
      }

      // If the subject does not exist, proceed to add it
      const newSubject = await this._courseRepository.addSubject(
        syllabus,
        standard,
        subject
      );

      if (newSubject) {
        return {
          success: true,
          message: "Subject added successfully",
          subject: newSubject,
        };
      } else {
        return {
          success: false,
          message: "Failed to add subject",
        };
      }
    } catch (error) {
      console.error("Error adding subject:", error);
      throw new Error(`Failed to add subject: ${error}`);
    }
  }

  async getSubjects(syllabus: string, standard: string) {
    try {
      const subjects =
        await this._courseRepository.findSubjectsBySyllabusAndStandard(
          syllabus,
          standard
        );
      if (subjects && subjects.length > 0) {
        return { success: true, message: "Subjects found", subjects };
      } else {
        return {
          success: false,
          message: "No subjects found for the provided syllabus and standard.",
        };
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
      throw new Error(`Failed to fetch subjects: ${error}`);
    }
  }
}
export default CourseUsecase;
