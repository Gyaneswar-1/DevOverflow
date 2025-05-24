import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { UserProfileInterface } from "../../types/ObjectTypes";
import { setUserAsync } from "../actions/user.action";

const initialState: UserProfileInterface = {
  id: "",
  email: "",
  fullName: "",
  userID: "",
  bio: "",
  city: "",
  country: "",
  profileImage: {
    url: "",
    fileId: "",
  },
  createdAt: "",
  updatedAt: "",
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
      state.bio = action.payload.bio;
      state.city = action.payload.city;
      state.country = action.payload.country;
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
      state.bio = "";
      state.city = "";
      state.country = "";
      state.createdAt = "";
      state.updatedAt = "";
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
          console.log("dff",action.payload);
          
          state.id = action.payload.id;
          state.email = action.payload.email;
          state.fullName = action.payload.fullName;
          state.userID = action.payload.userID;
          state.profileImage = action.payload.profileImage;
          state.createdAt = action.payload.createdAt;
          state.updatedAt = action.payload.updatedAt;
          state.isVerified = action.payload.isVerified;
          state.isAdmin = action.payload.isAdmin;
          state.bio = action.payload.bio;
          state.city = action.payload.city;
          state.country = action.payload.country;
        }
      );
  },
});

export const { setUser,clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
