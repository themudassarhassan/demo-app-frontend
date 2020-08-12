import http from "./httpClient";
import { apiUrl } from "../config";
const endPoint = `${apiUrl}/catagories`;

export const getAllCatagories = () => {
  return http.get(endPoint);
};
