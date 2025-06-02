import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user.reducer";
import { authReducer } from "./reducers/auth.reducer";
import { loadingReducer } from "./reducers/loader.reducer";
import { questionReducer } from "./reducers/questions.reducer";
import { userQuestionsReducer } from "./reducers/userQuestions.reducer";

export const store = configureStore({
  reducer: {
    userReducer,
    authReducer,
    loadingReducer,
    questionReducer,
    userQuestionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
