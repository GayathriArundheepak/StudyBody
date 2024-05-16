import mongoose from "mongoose";

interface ISlot {
  day: string[];
  time: string;
  isWeekend: boolean;
}

export interface IMaterial {
  headline: string;
  url: string;
}

export interface IMaterials {
  note: IMaterial;
  video: IMaterial;
}

// interface ISubject {
//   name: string;
// }

// interface IClass{
//   name:string;
//   suject:ISubject;
// }

interface ICourseBody {
  studentList: string[];
  syllabus: string;
  standard: string;
  subject: string;
  course_title: string;
  expairy?: Date;
  description: string;

  //attendance?: ;
  materials: IMaterial[];
  // students_list: mongoose.Types.ObjectId[];
  commission?: number;
  prize: number;
  slots: ISlot;
  promotionVideo?: string;
  adminApproved: boolean | null;
}

export default ICourseBody;
