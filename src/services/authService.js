import http from "./httpClient";
import { apiUrl } from "../config";
const apiEndPoint = apiUrl + "/login";

export const login = (email, password) => {
  return http.post(apiEndPoint, { email, password });
};

export const verifyEmail = (email) => {
  return http.post(apiUrl + "/verify-email", { email });
};

export const resetPassword = (email, token, password) => {
  return http.post(apiUrl + "/reset-password", { email, token, password });
};
