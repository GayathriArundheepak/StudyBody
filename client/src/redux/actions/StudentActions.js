

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [],
  loading: false,
  error: null,
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    fetchStudentsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchStudentsSuccess(state, action) {
      state.loading = false;
      state.students = action.payload;
    },
    fetchStudentsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    blockStudent(state, action) {
      const studentId = action.payload;
      state.students = state.students.map(student => {
        if (student.id === studentId) {
          return { ...student, isBlocked: true };
        }
        return student;
      });
    },
    unblockStudent(state, action) {
      const studentId = action.payload;
      state.students = state.students.map(student => {
        if (student.id === studentId) {
          return { ...student, isBlocked: false };
        }
        return student;
      });
    },
  },
});

export const {
  fetchStudentsStart,
  fetchStudentsSuccess,
  fetchStudentsFailure,
  blockStudent,
  unblockStudent,
} = studentSlice.actions;

// Define fetchStudents action creator function
export const fetchStudents = () => async (dispatch) => {
  dispatch(fetchStudentsStart());
  try {
    // Perform API call to fetch students data
    const response = await fetch('your_api_endpoint');
    const data = await response.json();
    dispatch(fetchStudentsSuccess(data)); // Dispatch success action with fetched data
  } catch (error) {
    dispatch(fetchStudentsFailure(error.message)); // Dispatch failure action with error message
  }
};


export default studentSlice.reducer;
