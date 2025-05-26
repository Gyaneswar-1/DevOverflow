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
    console.log("The problem", fullName, email, password, userID);
    const response = await axios.post(
      `${API}/auth/signin`,
      { email, fullName, userID, password },
      { withCredentials: true }
    );
    console.log("The problem", response);

    if (response.data.statusCode === 200) {

      return {
        success: true,
        message: response.data.message,
      };
    } else {
      return {
        success: false,
        message: response.data.message,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Sign in failed ${error}`,
    };
  }
};
