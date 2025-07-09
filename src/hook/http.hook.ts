import axios, { AxiosError } from "axios";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const request = async <T = any>(
  url: string,
  method = "GET",
  body: string | null = null,
  headers = {}
): Promise<T> => {
  try {
    const response = await axios({
      url,
      method,
      data: body,
      headers: { "Content-Type": "application/json", ...headers },
    });

    return response.data;
  } catch (e) {
    const error = e as AxiosError;

    throw {
      message: `Could not fetch ${url}, status: ${
        error.response?.status || error.message
      }`,
      status: error.response?.status,
      originalError: error,
    };
  }
};
