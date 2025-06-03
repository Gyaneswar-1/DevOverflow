import axios from "axios";
import { API } from "./API";
import type { userAnswerInterface } from "@/types/ObjectTypes";

export const getUserAnswerService = async (): Promise<{
  success: boolean;
  message: string;
  data?: userAnswerInterface[];
}> => {
  try {
    const response = await axios.get(`${API}/profile/get-answers`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return {
        success: true,
        message: "Answers fetched successfully",
        data: response.data.data,
      };
    } else {
      return {
        success: false,
        message: "Failed to fetch data",
        data: response.data.data,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Failed to fetch Answers: ${error}`,
    };
  }
};
