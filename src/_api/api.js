import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 500000,
  headers: { "X-Custom-Header": "foobar" },
});

const access_token = JSON.parse(localStorage.getItem("user"));

// client.interceptors.request.use(
//   function (config, error) {
//     if (access_token) {
//       config.headers.Authorization = `Bearer ${access_token.token}`;
//     }

//     return config;
//   },
//   function (error) {
//     // Do something with request error

//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// client.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       localStorage.clear();
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export { client };
