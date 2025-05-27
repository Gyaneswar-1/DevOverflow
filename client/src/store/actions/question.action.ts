import { getQuestionsService } from "@/service/getQuestions.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const setQuestionAsync = createAsyncThunk("questions/setQuestion",async (_,{ rejectWithValue})=>{
    try {
        const response = await getQuestionsService();
        if (response.success && response.data) {
            return response.data
        }else{
            return rejectWithValue(response.message)
        }
    } catch (error) {
        return rejectWithValue("Failed to fetch questions")
        
    }
})

