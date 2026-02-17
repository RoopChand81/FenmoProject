// Base URL
const BASE_URL = "http://localhost:5000";

// Auth APIs
export const AUTH_API = {
  LOGIN: `${BASE_URL}/api/auth/login`,
  REGISTER: `${BASE_URL}/api/auth/register`,
  LOGOUT: `${BASE_URL}/api/auth/logout`,
};

// User APIs
export const USER_API = {
  PROFILE: `${BASE_URL}/api/users/profile`,
  UPDATE_PROFILE: `${BASE_URL}/api/users/profile/update`,
  DELETE_USER: `${BASE_URL}/api/users/delete`,
};

// Product APIs
export const PRODUCT_API = {
  GET_ALL: `${BASE_URL}/api/products`,
  GET_SINGLE: (id) => `${BASE_URL}/api/products/${id}`,
  CREATE: `${BASE_URL}/api/products`,
  UPDATE: (id) => `${BASE_URL}/api/products/${id}`,
  DELETE: (id) => `${BASE_URL}/api/products/${id}`,
};
