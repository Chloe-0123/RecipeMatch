import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001', // Update the port if needed
  });
  