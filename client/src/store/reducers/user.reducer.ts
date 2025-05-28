import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type {
  UserProfileInterface,
  UserStateInterface,
} from "../../types/ObjectTypes";
import { setUserAsync } from "../actions/user.action";

const initialState: UserStateInterface = {
  id: "",
  email: "",
  fullName: "",
  userID: "",
  bio: "",
  city: "",
  country: "",
  profileImage: {
    url: "",
  },
  createdAt: "",
  updatedAt: "",
  isVerified: false,
  isAdmin: false,
  isLoading: false,
  isError: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserStateInterface>) => {
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
      .addCase(setUserAsync.pending, (state) => {
        console.log("Pending");
        state.isLoading = true;
      })
      .addCase(
        setUserAsync.fulfilled,
        (state, action: PayloadAction<UserProfileInterface>) => {
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
          state.isLoading = false;
          state.isError = false;
        }
      )
      .addCase(setUserAsync.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
