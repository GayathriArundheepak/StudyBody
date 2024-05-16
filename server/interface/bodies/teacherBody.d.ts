export interface ITeacherBody {
  profilePic?: string | null;
  username: string;
  email: string;
  password?: string;
  gender?: string;
  hire_date?: Date | null;
  date_of_birth?: Date;
  employee_id?: string | null;

  qualifications?: string[] | null;
  phone_number?: string | null;
  userType?: string;
}

export default ITeacherBody;
