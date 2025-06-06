import type { AuthState } from "@/types/ObjectTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
