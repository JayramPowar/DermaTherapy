import { api } from "./api";

export const getRecordData = async (email) => {
  try {
    const response = await api.get(`/records?email=${encodeURIComponent(email)}`);

    // Check if response data is valid
    if (!response || !response.data || !response.data.data) {
      return []; // fallback to empty array
    }

    // Return array of documents
    return response.data.data;
  } catch (error) {
    console.error("Error fetching record data:", error);
    return []; // fallback to empty array on error
  }
};
