import { getUserQuestionsService } from "@/service/getUserQuestions";
import type { QuestionInterface } from "@/types/ObjectTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserQuestionsAsync = createAsyncThunk(
  "userQuestions/getUserQuestions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserQuestionsService();
      if (response.success && response.data) {
        return response.data as QuestionInterface[];
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue("Failed to fetch user profile");
    }
  }
);
