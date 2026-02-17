// src/services/api.js
import axios from "axios";
const apiCall = async (url, method = "GET", data = null, token = null) => {
  try {
    const response = await axios({
      url: `${url}`,
      method: method,
      data: data,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    return response;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default apiCall;
