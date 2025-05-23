import axios from "axios";
import { API } from "./API";
import type { UserProfileInterface } from "@/types/ObjectTypes";

export const getProfileService = async (): Promise<{
  success: boolean;
  message: string;
  data?: UserProfileInterface;
}> => {
  try {
    const response = await axios.get(`${API}/profile/get`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return {
        success: true,
        message: "User profile fetch successful",
        data: response.data.data,
      };
    } else {
      return {
        success: false,
        message: "User Profile fetch failed",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "User Profile fetch failed",
    };
  }
};
