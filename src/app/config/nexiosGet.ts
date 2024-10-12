import { Nexios } from "nexios-http";

const nexiosInstance = new Nexios({
  baseURL: "http://localhost:5000/api/a6",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default nexiosInstance;
