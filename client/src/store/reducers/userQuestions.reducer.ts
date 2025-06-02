import type { QuestionInterface } from "@/types/ObjectTypes";
import { createSlice } from "@reduxjs/toolkit";
import { getUserQuestionsAsync } from "../actions/userQuestion.action";

const initialState: {
  questions: QuestionInterface[];
  isLoading: boolean;
  isError: boolean;
} = {
  questions: [],
  isLoading: false,
  isError: false,
};

const userQuestionsSlice = createSlice({
  name: "userQuestions",
  initialState,
  reducers: {
    setUserQuestions: (state, action) => {
      state.questions = action.payload;
      state.isLoading = false;
      state.isError = false;
    },
    resetUserQuestions: (state) => {
      state.questions = [];
      state.isLoading = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserQuestionsAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getUserQuestionsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.questions = action.payload;
        console.log("User questions fetched successfully:", action.payload);
      })
      .addCase(getUserQuestionsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.error("Failed to fetch user questions:", action.error.message);
      });
  },
});

export const { setUserQuestions, resetUserQuestions } = userQuestionsSlice.actions;
export const userQuestionsReducer = userQuestionsSlice.reducer;
