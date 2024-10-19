import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",  // Assuming Piston API is being used
});

export const executeCode = async (language, sourceCode) => {
  try {
    const response = await API.post("/execute", {
      language: language,                       // The selected language (e.g., 'python', 'cpp')
      version: LANGUAGE_VERSIONS[language],     // Version mapping from the constants
      files: [
        {
          content: sourceCode,                  // The source code submitted by the user
        },
      ],
    });

    return response.data;                       // Return API response data
  } catch (error) {
    console.error("Code execution error:", error);  // Log any errors encountered
    throw error;                                 // Re-throw the error for further handling
  }
};
