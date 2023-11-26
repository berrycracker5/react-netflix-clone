import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "21a3f4bcc5c0f090a58ad23129861099",
    language: "ko-KR",
  },
});

export default axiosInstance;
