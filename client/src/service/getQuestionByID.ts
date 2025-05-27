import axios from "axios";
import { API } from "./API";
import type { QuestionDetailInterface } from "@/types/ObjectTypes";

export const getQuestionByID = async (
  id: string
): Promise<{
  success: boolean;
  message: string;
  data?: QuestionDetailInterface;
}> => {
  try {
    const response = await axios.get(`${API}/questions/get/${id}`, {
      withCredentials: true,
    });

    if (response.data.success) {
      return {
        success: true,
        message: "Data fetched successfully",
        data: response.data.data,
      };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to fetch question",
      };
    }
  } catch (error) {
    const errorMessage = 
      error instanceof Error 
        ? error.message 
        : "An unknown error occurred while fetching the question";
    
    return {
      success: false,
      message: errorMessage,
    };
  }
};