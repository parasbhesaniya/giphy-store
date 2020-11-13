import axios from "axios";

const generateAxiosInstance = async (contentType = null) => {
  return new Promise((resolve) => {
    const instance = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL || "",
      headers: {
        "content-type": contentType ? contentType : "application/json",
      },
    });

    resolve(instance);
  });
};

export default generateAxiosInstance;
