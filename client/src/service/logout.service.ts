import axios from "axios";
import { API } from "./API";

export const logoutService = async () => {
  try {
    const response = await axios.post(
      `${API}/auth/logout`,
      {},
      { withCredentials: true }
    );
    if (response.data.statusCode === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Logout failed:", error);
    return false;
  }
};
