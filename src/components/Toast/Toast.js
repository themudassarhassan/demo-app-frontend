import React from "react";

import { ToastContainer } from "react-toastify";
export const Toast = (props) => {
  return (
    <ToastContainer
      position="bottom-left"
      autoClose={1500}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};
