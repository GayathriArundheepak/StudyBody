import { ObjectId } from "mongoose";
export interface IMaterial {
  headline: string;
  url: string;
}

export interface IMaterials {
  note: IMaterial;
  video: IMaterial;
}

export interface ICourse {
  isAvailable?: boolean;
  _id: ObjectId;
  syllabus: string;
  standard: string;
  subject: string;
  teacher_id: ObjectId;
  course_title: string;
  expairy: Date | null;
  description: string;
  attendance: any[]; // Define the type for attendance
  material: IMaterials;
  students_list?: ObjectId[] | null;
  commission: number | null;
  prize: number;
  name: string | null;
  time: string | null;
  isWeekend: boolean | null;
  period: string | null;
  promotion_video: string | null;
  slots: ISlot;
  adminApproved: boolean | null;
  community: string;
}
interface IDay {
  name: string;
  time: string;
}

interface ISlot {
  name: string;
  time: string;
  isWeekend: boolean;
}

// interface ISubject{
//  name:String[];
// }

// interface IClass {
// name:string;
// Subject:ISubject[];
// }
