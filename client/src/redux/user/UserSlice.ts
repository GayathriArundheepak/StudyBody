import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CurrentUser {
  cart: string[];
  wishlist: string[];
  _id: string;
  profilePic?: string | null;
  username?: string;
  email: string;
  password?: string;
  newPassword?: string;
  gender?: string;
  date_of_birth?: Date;
  userType?: string;
  mylearnings?: string[];
}

// Define interface for user state
export interface UserSliceState {
  data: any;
  currentUser: CurrentUser | null; // Include currentUser property
  loading: boolean;
  error: boolean | string;
  userType?: string;
}

// Define initial state
const initialState: UserSliceState = {
  currentUser: null,
  loading: false,
  error: false,
  data: undefined,
};

// Define interface for sign in payload
interface SignInPayload {
  data: any;
  userType: string;
}

// Create user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action: PayloadAction<SignInPayload>) => {
      state.currentUser = action.payload.data;
      state.userType = action.payload.userType;
      state.loading = false;
      state.error = false;
    },
    signInFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },

    updateUserSuccess: (state, action: PayloadAction<any>) => {
      state.currentUser = {
        ...state.currentUser,
        ...action.payload.data,
      };
      state.loading = false;
      state.error = false;
    },

    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    deleteUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null;
      state.userType = "";
      state.loading = false;
      state.error = false;
    },
  },
});

// Export actions and reducer separately
export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
