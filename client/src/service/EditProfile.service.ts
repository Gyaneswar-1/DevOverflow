import axios from "axios";
import { API } from "./API";
import type { UserProfileInterface } from "@/types/ObjectTypes";

export const editProfileService = async (formData: FormData): Promise<{
  success: boolean;
  message: string;
  data?: UserProfileInterface;
}> => {
  try {
    const response = await axios.put(`${API}/profile/edit`, formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      return {
        success: true,
        message: "Profile updated successfully",
        data: response.data.data,
      };
    } else {
      return {
        success: false,
        message: "Profile update failed",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Profile update failed",
    };
  }
};