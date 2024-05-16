import mongoose from "mongoose";
import Subjects from "../models/subject.model";
import Courses from "../models/course.model";
import ICourseBody from "../interface/bodies/courseBody";
import ICourseRepositoryInterface from "../interface/repositoryInterface/ICourseRepositoryInterface";
import { ICourse } from "../interface/course";
// Define the IReview interface
interface IReview {
  comment: string;
  studentId: string; // Assuming studentId is a string
  // You can include additional fields if needed, such as timestamp, rating, etc.
}
interface Material {
  headline: string;
  url: string;
}

interface Materials {
  note: Material | null;
  video: Material | null;
}
class CourseRepository implements ICourseRepositoryInterface {
  async createCourse(courseData: ICourseBody, id: string) {
    try {
      const courseDetails = { ...courseData, teacher_id: id };

      const newCourse = Courses.create(courseDetails);
      return newCourse;
    } catch (error) {
      console.error("Error creating course:", error);
      throw new Error(`Failed to create course: ${error}`);
    }
  }
  async editCourse(courseData: ICourseBody, id: string, courseId: string) {
    try {
      // Construct the filter to find the course by its ID and associated teacher
      const filter = { _id: courseId, teacher_id: id };

      // Use the spread operator to create a new object and conditionally exclude promotionVideo
      const updatedData = {
        ...courseData,
        ...(courseData.promotionVideo && courseData.promotionVideo !== ""
          ? { promotionVideo: courseData.promotionVideo }
          : {}),
      };

      // Find the existing course and update it with the new data
      const updatedCourse = await Courses.findOneAndUpdate(filter, courseData, {
        new: true, // Return the updated document
        runValidators: true, // Run validators to ensure data consistency
      });

      // If no course is found, throw an error
      if (!updatedCourse) {
        throw new Error(`Course with ID ${courseId} not found`);
      }

      return updatedCourse;
    } catch (error) {
      console.error("Error updating course:", error);
      throw new Error(`Failed to update course: ${error}`);
    }
  }

  async getCourses(syllabus: string, standard: string) {
    try {
      const courseList = await Courses.find({
        syllabus: syllabus,
        standard: standard,
      });

      return courseList;
    } catch (error) {
      console.error("Error creating course:", error);
      throw new Error(`Failed to create course: ${error}`);
    }
  }

  async getCoursesByTeacher(id: string) {
    try {
      const courseList = await Courses.find({ teacher_id: id });

      return courseList;
    } catch (error) {
      console.error("Error creating course:", error);
      throw new Error(`Failed to create course: ${error}`);
    }
  }
  async searchCourse(searchData: string) {
    try {
      const courseList: ICourse[] = await Courses.find();
      console.log("search");
      // Split the searchData into separate words
      const searchWords: string[] = searchData.toLowerCase().split(" ");

      // Define your regex pattern based on each word in the search query
      const regexPatterns: RegExp[] = searchWords.map(
        (word) => new RegExp(word, "i")
      ); // 'i' flag for case-insensitive search

      const filteredCourses: ICourse[] = courseList.filter((course) => {
        // Convert relevant course data to lowercase for comparison
        const subjectLower = course.subject.toLowerCase();
        const standardLower = course.standard.toLowerCase();
        const syllabusLower = course.syllabus.toLowerCase();
        const prizeLower = course.prize.toString().toLowerCase();

        // Match each word in the search query against the lowercase data
        return regexPatterns.every(
          (regex) =>
            regex.test(subjectLower) ||
            regex.test(standardLower) ||
            regex.test(syllabusLower) ||
            regex.test(prizeLower)
        );
      });
      console.log(filteredCourses);
      return filteredCourses;
    } catch (error) {
      console.error("Error searching courses:", error);
      throw new Error(`Failed to search courses: ${error}`);
    }
  }

  async filterCourse(searchData: string) {
    try {
      // Get all courses from the database
      const courseList: ICourse[] = await Courses.find();

      // Define your regex pattern based on the searchData provided
      const regexPattern = new RegExp(searchData, "i"); // 'i' flag for case-insensitive search

      const filteredCourses: ICourse[] = courseList.filter((course) => {
        // Match the regex pattern against any relevant course data including slot
        return regexPattern.test(course.subject);
      });

      // Return the filtered courses
      return filteredCourses;
    } catch (error) {
      console.error("Error filtering courses:", error);
      throw new Error(`Failed to filter courses: ${error}`);
    }
  }

  async deleteCourse(courseId: string) {
    try {
      // Assuming that Courses is your Mongoose model
      const deletedCourse = await Courses.findByIdAndDelete(courseId);

      if (!deletedCourse) {
        throw new Error(`Course with ID ${courseId} not found.`);
      }

      return deletedCourse;
    } catch (error) {
      console.error("Error deleting course:", error);
      throw new Error(`Failed to delete course: ${error}`);
    }
  }
  async getCourseByTeacher(id: string) {
    try {
      const courses = await Courses.find({ teacher_id: id }).exec();
      return courses;
    } catch (error) {
      console.error("Error fetching courses by teacher:", error);
      throw new Error(`Failed to fetch courses by teacher: ${error}`);
    }
  }

  async findCourseByTitle(title: string) {
    try {
      // Query the database to find a course by its title
      const course = await Courses.findOne({ course_title: title }).exec();
      return course;
    } catch (error) {
      console.error("Error finding course by title:", error);
      throw new Error(`Failed to find course by title: ${error}`);
    }
  }

  async findMaterialsByCourseId(courseId: string) {
    try {
      const result = await Courses.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(courseId) }, // Match the course ID
        },
        {
          $project: {
            subject: 1,
            materials: 1, // Include all fields within the materials array
          },
        },
      ]);
      console.log(result);
      return result;
    } catch (error) {
      console.error("Error fetching materials by course ID:", error);
      throw new Error(`Failed to fetch materials by course ID: ${error}`);
    }
  }

  async updateCourse(courseId: string, materials: Materials): Promise<ICourse> {
    console.log(materials);
    try {
      const updatedCourse = await Courses.findByIdAndUpdate(
        courseId,
        { $push: { materials: materials } },
        { new: true }
      );
      console.log(updatedCourse);
      if (!updatedCourse) {
        throw new Error("Course not found.");
      }
      return updatedCourse;
    } catch (error) {
      console.error("Error updating course:", error);
      throw new Error(`Failed to update course: ${error}`);
    }
  }

  async updateCourseStudentsList(courseIds: string[], studentId: string) {
    const promises = courseIds.map(async (courseId) => {
      try {
        const course = await Courses.findById(courseId);

        if (!course) {
          return {
            success: false,
            message: `Course with ID ${courseId} not found.`,
          };
        }

        if (course.students_list && course.students_list.length >= 35) {
          return {
            success: false,
            message: `Course with ID ${courseId} is full. Cannot enroll more students.`,
          };
        }
        const updatedCourse = await Courses.findOneAndUpdate(
          { _id: courseId }, // Filter: Find the course by its ID
          {
            $push: { students_list: studentId }, // Push studentObjectId to students_list
            $set: { isAvailable: true }, // Set isAvailable to true
          },
          { new: true } // Return the updated document
        );

        if (!updatedCourse) {
          return {
            success: false,
            message: `Course with ID ${courseId} not found.`,
          };
        }

        if (
          updatedCourse.students_list &&
          updatedCourse.students_list.length > 35
        ) {
          return {
            success: false,
            message: `Course with ID ${courseId} is full. Cannot enroll more students.`,
          };
        }

        return {
          success: true,
          message: `Course with ID ${courseId} students list updated successfully`,
        };
      } catch (error) {
        throw new Error(
          `Error updating course with ID ${courseId} students list`
        );
      }
    });

    return Promise.all(promises);
  }
  async addReviewToCourse(courseId: string, reviewData: IReview) {
    try {
      // Find the course by ID
      const updatedCourse = await Courses.findOneAndUpdate(
        { _id: courseId },
        { $push: { review: reviewData } },
        { new: true }
      ).populate("review.studentId"); // Populate the studentId field in the review array

      if (!updatedCourse) {
        throw new Error("Course not found");
      }

      return updatedCourse;
    } catch (error) {
      console.error("Error adding review to course:", error);
      throw new Error(`Failed to add review to course: ${error}`);
    }
  }

  async approveCourse(id: string) {
    try {
      const isApproved = await Courses.findByIdAndUpdate(
        { _id: id },
        { $set: { adminApproved: true } },
        { new: true }
      );
      return isApproved;
    } catch (error) {
      throw new Error(`Failed to approve teacher : ${error}`);
    }
  }
  async disApproveCourse(id: string) {
    try {
      const isApproved = await Courses.findByIdAndUpdate(
        { _id: id },
        { $set: { adminApproved: false } },
        { new: true }
      );
      return isApproved;
    } catch (error) {
      throw new Error(`Failed to approve teacher : ${error}`);
    }
  }

  async getSubjectByCriteria(
    syllabus: string,
    standard: string,
    subject: string
  ) {
    try {
      // Find a subject with the provided criteria
      const existingSubject = await Subjects.findOne({
        syllabus,
        standard,
        subject,
      });

      return existingSubject;
    } catch (error) {
      console.error("Error fetching subject by criteria:", error);
      throw new Error(`Failed to fetch subject by criteria: ${error}`);
    }
  }

  async addSubject(
    syllabus: string,
    standard: string,
    subject: string
  ): Promise<any> {
    try {
      // Create a new subject document
      const newSubject = await Subjects.create({ syllabus, standard, subject });
      console.log("Subject added successfully:", newSubject);
      return newSubject;
    } catch (error) {
      console.error("Error adding subject to database:", error);
      throw new Error(`Failed to add subject to database: ${error}`);
    }
  }

  async findSubjectsBySyllabusAndStandard(syllabus: string, standard: string) {
    try {
      const subjects = await Subjects.find({ syllabus, standard }).distinct(
        "subject"
      );
      console.log(subjects);
      return subjects;
    } catch (error) {
      console.error("Error fetching subjects:", error);
      throw new Error(`Failed to fetch subjects: ${error}`);
    }
  }
  async findCourseById(courseId: string) {
    try {
      const course = await Courses.findOne({ _id: courseId });
      if (course) {
        return course;
      } else {
        throw new Error("Error finding course");
      }
    } catch (error) {
      throw new Error("Error finding course by course ID");
    }
  }
}

export default CourseRepository;
