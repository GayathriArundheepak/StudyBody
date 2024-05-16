export default interface Course {
  expiry: string;
  teacher_id: string | null;
  email?: string | undefined;
  _id: string;
  course_title?: string;
  description?: string;
  subject?: string;
  syllabus?: string;
  standard?: string;
  prize?: number;
  commission?: number;
  // materials?: {
  //   note: string[];
  //   video: string[];
  // };
  promotion_video?: string;
  isAvailable?: boolean;
  slot: {
    day: string[];
    isWeekend: boolean;
    time: string;
    _id: string;
  };
  review?: string;
  createdAt: Date;
  students_list: string[];
}

// export default interface Course {
//     teacher_id: string | null;
//     email?: string |null;
//     _id: string;
//     course_title?: string;
//     description?: string;
//     subject?: string;
//     syllabus?: string;
//     standard?: string;
//     prize?: number;
//     commission?: number;
//     promotion_video?: string;
//     isAvailable?: boolean;
//     slot: {
//       day: string[];
//       isWeekend: boolean;
//       time: string;
//       _id: string;
//     };
//     review?: string; // Add this property if it's required
//   }
