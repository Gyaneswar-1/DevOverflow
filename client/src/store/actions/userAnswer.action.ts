import { getUserAnswerService } from "@/service/getUserAnswers";
import type { userAnswerInterface } from "@/types/ObjectTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const asyncUserAnswer = createAsyncThunk(
  "userAnswers/getUserAnswers ",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserAnswerService();
      if (response.success) {
        return response.data as userAnswerInterface[];
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue("Failed to fetch user answers");
    }
  }
);
