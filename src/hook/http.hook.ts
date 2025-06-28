import axios, { AxiosError } from "axios";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

interface ApiResponse<T> {
  data: T;
  status: number;
}

export const request = async <T = never>(
  url: string,
  method = "GET",
  body: string | null = null,
  headers = {}
): Promise<ApiResponse<T>> => {
  try {
    const response = await axios({
      url,
      method,
      data: body,
      headers: { "Content-Type": "application/json", ...headers },
    });

    return {
      data: response.data,
      status: response.status,
    };
  } catch (e) {
    const error = e as AxiosError;

    throw new Error(
      `Could not fetch ${url}, status: ${
        error.response?.status || error.message
      }`
    );
  }
};
