import axios from "axios";

const newApi = axios.create({
  baseURL: "http://localhost:7632",
});

newApi.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

class Api {
  async get(url: string) {
    return (await newApi.get(url)).data;
  }

  async post(url: string, data: any) {
    return (await newApi.post(url, data)).data;
  }

  async put(url: string, data: any) {
    return (await newApi.put(url, data)).data;
  }

  async delete(url: string) {
    return (await newApi.delete(url)).data;
  }
}

export const api = new Api();
