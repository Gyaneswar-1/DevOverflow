import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    resetLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { setLoading, resetLoading } = loaderSlice.actions;
export const loadingReducer = loaderSlice.reducer;
