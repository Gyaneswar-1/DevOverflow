import axios from "axios";
import { API } from "./API";
import type { signInInterface } from "@/types/ObjectTypes";

export const signInService = async ({
  fullName,
  email,
  password,
  userID,
}: signInInterface): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axios.post(
      `${API}/auth/signin`,
      { email, fullName, userID, password },
      { withCredentials: true }
    );
    if (response.status === 200) {
      return {
        success: true,
        message: "Sign in successful",
      };
    } else {
      return {
        success: false,
        message: "Sign in failed",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Sign in failed",
    };
  }
};
