import axios from "axios";
import { API } from "./API";
import type { QuestionInterface } from "@/types/ObjectTypes";

export const getUserAnswerService = async (): Promise<{
  success: boolean;
  message: string;
  data?: QuestionInterface[];
}> => {
  try {
    const response = await axios.get(`${API}/profile/get-questions`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return {
        success: true,
        message: "Questions fetched successfully",
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
      message: `Failed to fetch questions: ${error}`,
    };
  }
};
