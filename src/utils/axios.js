import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://mern-project-backend-file.onrender.com", // 👈 must match your backend route prefix
  // baseURL: "http://localhost:8000",
  // withCredentials: true,
});
