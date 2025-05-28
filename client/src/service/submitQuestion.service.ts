import axios from "axios";
import { API } from "./API";

export const submitQuestion = async (formData: any, image: File | null) => {
  try {
    console.log(formData, image);
    
    const data = new FormData();
    
    // Append form fields
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('tags', formData.tags);
    
    // Append images
    if (image) {
     data.append('image', image);
    }

    const response = await axios.post(`${API}/questions/add`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      success: true,
      message: response.data.message || "Question submitted successfully",
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to submit question",
      error: error.response?.data || error.message,
    };
  }
};
