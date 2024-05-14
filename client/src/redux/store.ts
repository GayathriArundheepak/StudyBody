


import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./user/UserSlice";
import { courseReducer } from "./course/CourseSlice"; // Import the courseReducer

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";


// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  course: courseReducer, // Add the courseReducer
  // StudentList: studentReducer, // If needed, you can add this reducer too
});

// Persist configuration
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
});

// Define RootState interface
export interface RootState {
  [x: string]: any;
  user: ReturnType<typeof userReducer>; // Adjust the type according to userReducer
  course: ReturnType<typeof courseReducer>; // Define the type for the 'course' property
  // StudentList: any; // Adjust the type according to your requirements
}

// Persistor and dispatch
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export default store;
