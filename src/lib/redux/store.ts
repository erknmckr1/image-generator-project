import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import creditReducer from "./slices/credit.slice";
import languageReducer from "./slices/language.slice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    credit: creditReducer,
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
