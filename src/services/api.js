import axios from "axios";

export const apiCall = (method, path, data) =>
  new Promise((resolve, reject) =>
    axios[method](path, data)
      .then((res) => resolve(res.data))
      .catch((error) => reject(error.response.data.error))
  );

export const setTokenHeader = (token) => {
  if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete axios.defaults.headers.common["Authorization"];
};
