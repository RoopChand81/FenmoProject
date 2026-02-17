import axios from "axios";

const BASE_URL = "http://localhost:5000";

const apiCall = async ({
  url,
  method = "GET",
  data = null,
  params = null,
  idempotencyKey = null,
}) => {
  try {
    const response = await axios({
      baseURL: BASE_URL,
      url,
      method,
      data,
      params,
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
        ...(idempotencyKey && {
          "Idempotency-Key": idempotencyKey,
        }),
      },
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Something went wrong";
  }
};

export default apiCall;
