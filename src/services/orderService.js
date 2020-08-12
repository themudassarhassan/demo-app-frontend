import http from "./httpClient";
import { apiUrl } from "../config";

export const createPaymentIntent = (body) => {
  return http.post(
    apiUrl + "/create-payment-intent",
    { items: body },
    {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("user")).token,
      },
    }
  );
};
