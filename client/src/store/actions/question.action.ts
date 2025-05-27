// import { getProfileService } from "../../service/getprofile.service";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import type { UserProfileInterface } from "../../types/ObjectTypes";

import { createAsyncThunk } from "@reduxjs/toolkit";

// export const setUserAsync = createAsyncThunk(
//   "user/setUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await getProfileService();
//       if (response.success && response.data) {
//         return response.data as UserProfileInterface;
//       } else {
//         return rejectWithValue(response.message);
//       }
//     } catch (error) {
//       return rejectWithValue("Failed to fetch user profile");
//     }
//   }
// );

export const serQuestionAsync = createAsyncThunk("questions/setQuestion",async (__dirname,{ rejectWithValue})=>{
    try {
        
    } catch (error) {
        
    }
})

