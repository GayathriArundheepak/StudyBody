export default interface ICourse {
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
  adminApproved: boolean;
}
