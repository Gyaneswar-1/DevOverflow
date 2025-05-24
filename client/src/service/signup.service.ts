import axios from "axios";
import { API } from "./API";
import type { signUpInterface } from "../types/ObjectTypes";

export const signUpService = async ({
  email,
  password,
}: signUpInterface): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axios.post(
      `${API}/auth/signup`,
      { email, password },
      { withCredentials: true }
    );
    console.log(response.data.statusCode);
    
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
    console.log(error);
    
    return {
      success: false,
      message: "Sign up failed",
    };
  }
};
