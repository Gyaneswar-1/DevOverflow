import type { userAnswerInterface } from "@/types/ObjectTypes";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { asyncUserAnswer } from "../actions/userAnswer.action";

const initialState: {
  answers: userAnswerInterface[];
  isLoading: boolean;
  isError: boolean;
} = {
  answers: [],
  isLoading: false,
  isError: false,
};

export const userAnswerSlice = createSlice({
  name: "userAnswers",
  initialState,
  reducers: {
    setUserAnswers: (state, action: PayloadAction<userAnswerInterface[]>) => {
      state.answers = action.payload;
      state.isLoading = false;
      state.isError = false;
    },
    resetUserAnswers: (state) => {
      state.answers = [];
      state.isLoading = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncUserAnswer.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        asyncUserAnswer.fulfilled,
        (state, action: PayloadAction<userAnswerInterface[]>) => {
          state.isLoading = false;
          state.isError = false;
          state.answers = action.payload;
          console.log("User answers fetched successfully:", action.payload);
        }
      )
      .addCase(asyncUserAnswer.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        console.error("Failed to fetch user answers:");
      });
  },
})

export const {setUserAnswers,resetUserAnswers} = userAnswerSlice.actions;
export const userAnswerReducer = userAnswerSlice.reducer;
