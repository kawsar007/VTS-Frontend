import axios from "axios";

export const axiosOpen = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
