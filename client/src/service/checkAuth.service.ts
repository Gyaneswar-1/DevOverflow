import axios from "axios";
import { API } from "./API";

export const checkAuth = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const response = await axios.get(`${API}/auth/is-auth`, {
      withCredentials: true,
    });
    console.log("Response from checkAuth 1: ", response.data);
 

    if (response.data.success) {
      return {
        success: true,
        message: "user authorized",
      };
    }

    return {
      success: false,
      message: "User is not authorized",
    };
  } catch (error) {
    console.log("Error ", error);

    return {
      success: false,
      message: "Error",
    };
  }
};
