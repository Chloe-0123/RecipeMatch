import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://recipe-match.onrender.com', // Update the port if needed
  });
  