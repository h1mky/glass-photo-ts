import { request } from "../../hook/http.hook";
import { useQuery, useMutation } from "@tanstack/react-query";

export interface SignUpRequest {
  email: string;
  username: string;
  password: string;
}

export interface EditedData {
  user_img?: string;
  description?: string;
}

export type SignInRequest = Omit<SignUpRequest, "username">;

export const fetchMainPageUser = () => {
  return request("http://localhost:3000/", "GET");
};

export const useUserProfile = (id: number) => {
  return useQuery({
    queryKey: ["user-profile", id],
    queryFn: () => request(`http://localhost:3000/user/${id}`, "GET"),
    enabled: !!id,
    retry: false,
  });
};

export const useSignUp = () =>
  useMutation({
    mutationFn: (data: SignUpRequest) =>
      request("http://localhost:3000/sign-up", "POST", JSON.stringify(data)),
    retry: false,
  });

export const useSignIn = () =>
  useMutation({
    mutationFn: (data: SignInRequest) =>
      request("http://localhost:3000/sign-in", "POST", JSON.stringify(data)),
    onSuccess: (data) => {
      localStorage.setItem("authToken", data.data.token);
    },
    retry: false,
  });

export const usePatchUser = () =>
  useMutation({
    mutationFn: (data: EditedData) =>
      request("http://localhost:3000/user", "PATCH", JSON.stringify(data)),
    retry: false,
  });
