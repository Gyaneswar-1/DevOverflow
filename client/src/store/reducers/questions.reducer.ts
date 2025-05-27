import type {  QuestionInterface } from "@/types/ObjectTypes";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { setQuestionAsync } from "../actions/question.action";

const initialState: {
  questions: QuestionInterface[];
  isError: boolean;
  isLoading: boolean;
} = {
  questions: [],
  isError: false,
  isLoading: false,
};

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<QuestionInterface[]>) => {
      state.questions = action.payload;
      state.isLoading = false;
      state.isError = false;
    },
    resetQuestions: (state) => {
      state.questions = [];
      state.isLoading = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setQuestionAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        setQuestionAsync.fulfilled,
        (state, action: PayloadAction<QuestionInterface[]>) => {
          state.questions = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(setQuestionAsync.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { setQuestions, resetQuestions } = questionSlice.actions;
export const questionReducer = questionSlice.reducer;