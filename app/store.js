import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import answerReducer from '../features/answerSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    answer:answerReducer
  },
});
