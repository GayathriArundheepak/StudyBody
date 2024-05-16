import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define interface for course
interface Course {
  _id: string;
  course_title: string;
  description: string;
  subject: string;
  prize: number;
  promotion_video?: string;
  materials: {
    note: string[];
    video: string[];
  };
  teacher_id: string;
  slot: {
    day: string[];
    isWeekend: boolean;
    time: string;
    _id: string;
  };
}

// Define interface for course state
export interface CourseSliceState {
  courses: Course[];
  loading: boolean;
  error: boolean | string;
}

// Define initial state
const initialState: CourseSliceState = {
  courses: [],
  loading: false,
  error: false,
};

// Create course slice
const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    fetchCoursesStart: (state) => {
      state.loading = true;
    },
    fetchCoursesSuccess: (
      state,
      action: PayloadAction<{ courseList: Course[] }>
    ) => {
      console.log(action.payload);
      state.courses = action.payload.courseList; // Accessing courseList from payload
      state.loading = false;
      state.error = false;
    },

    fetchCoursesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export actions and reducer separately
export const { fetchCoursesStart, fetchCoursesSuccess, fetchCoursesFailure } =
  courseSlice.actions;

export const courseReducer = courseSlice.reducer;
