import http from "./httpClient";
import { apiUrl } from "../config";
const endPoint = `${apiUrl}/products`;

export const getAllProducts = () => {
  return http.get(endPoint);
};

export const getProductById = (id) => {
  return http.get(endPoint + `/${id}`);
};

export const createProduct = (data) => {
  return http.post(endPoint, data, {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: JSON.parse(localStorage.getItem("user")).token,
    },
  });
};

export const getProductCatagories = () => {
  return http.get(`${apiUrl}/catagories`);
};

export const addComment = (comment, productId) => {
  return http.post(
    `${endPoint}/${productId}/comments`,
    { comment },
    {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("user")).token,
      },
    }
  );
};

export const getUserProducts = () => {
  return http.get(`${apiUrl}/my-products`, {
    headers: {
      Authorization: JSON.parse(localStorage.getItem("user")).token,
    },
  });
};

export const deleteProduct = (id) => {
  return http.delete(endPoint + `/${id}`, {
    headers: {
      Authorization: JSON.parse(localStorage.getItem("user")).token,
    },
  });
};
