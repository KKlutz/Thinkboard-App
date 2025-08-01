import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5050/api"
    : "https://thinkboard-backend-production.up.railway.app/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
