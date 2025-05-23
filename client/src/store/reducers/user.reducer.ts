import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { UserProfileInterface } from "../../types/ObjectTypes";
import { setUserAsync } from "../actions/user.action";

const initialState: UserProfileInterface = {
  id: "",
  email: "",
  fullName: "",
  userID: "",
  profileImage: {
    url: "",
    fileId: "",
  },
  createdAt: new Date(),
  updatedAt: new Date(),
  isVerified: false,
  isAdmin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfileInterface>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.userID = action.payload.userID;
      state.profileImage = action.payload.profileImage;
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;
      state.isVerified = action.payload.isVerified;
      state.isAdmin = action.payload.isAdmin;
    },
    clearUser: (state) => {
      state.id = "";
      state.email = "";
      state.fullName = "";
      state.userID = "";
      state.profileImage = {
        url: "",
        fileId: "",
      };
      state.createdAt = new Date();
      state.updatedAt = new Date();
      state.isVerified = false;
      state.isAdmin = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setUserAsync.pending, () => {
        console.log("Pending");
      })
      .addCase(
        setUserAsync.fulfilled,
        (state, action:PayloadAction<UserProfileInterface>) => {
          state.id = action.payload.id;
          state.email = action.payload.email;
          state.fullName = action.payload.fullName;
          state.userID = action.payload.userID;
          state.profileImage = action.payload.profileImage;
          state.createdAt = action.payload.createdAt;
          state.updatedAt = action.payload.updatedAt;
          state.isVerified = action.payload.isVerified;
          state.isAdmin = action.payload.isAdmin;
        }
      );
  },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
