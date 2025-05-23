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
    console.log(response);
    
    if (response.status === 200) {
      return {
        success: true,
        message: "Sign up successful",
      };
    } else {
      return {
        success: false,
        message: "Sign up failed",
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
