import type { QuestionState } from "@/types/ObjectTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState: QuestionState = {
  id: "",
  title: "",
  description: "",
  tags: [],
  createdAt: "",
  createdBy: {
    id: "",
    fullName: "",
    profileImage: "",
  },
  isError: false,
  isLoading: false,
};

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestion: (state, action) => {},
    resetQuestion: (state, action) => {},
  },
  extraReducers:(builder)=>{
    builder.addCase("")
  }
});

export const { setQuestion, resetQuestion } = questionSlice.actions;
export const questionReducer =  questionSlice.reducer;
