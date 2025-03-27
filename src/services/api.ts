import axios from "axios";

const baseUrl = "http://localhost:8000/";
// const baseUrl = "http://192.168.40.230:8000/";

const api = axios.create({
   baseURL: baseUrl,
});

export default api;
