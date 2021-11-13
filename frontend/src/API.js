import axios from "axios";
// Singleton
export const API = axios.create({
  baseURL: "http://localhost:3100"
  // interceptors
});
