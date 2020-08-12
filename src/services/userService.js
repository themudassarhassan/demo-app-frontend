import http from "./httpClient";

import { apiUrl } from "../config";

const endPoint = `${apiUrl}/signup`;

export const signup = (user) => {
  return http.post(endPoint, { ...user });
};

export const changePassword = (oldPassword, newPassword) => {
  return http.put(
    `${apiUrl}/update-password`,
    { oldPassword, newPassword },
    {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("user")).token,
      },
    }
  );
};

export const updateProfile = (user) => {
  return http.put(`${apiUrl}/users`, user, {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: JSON.parse(localStorage.getItem("user")).token,
    },
  });
};
