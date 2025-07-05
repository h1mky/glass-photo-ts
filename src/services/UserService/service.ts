import { request } from "../../hook/http.hook";

export interface SignUpRequest {
  email: string;
  username: string;
  password: string;
}

export type SignInRequest = Omit<SignUpRequest, "username">;

export const fetchUserProfile = (ID: number) => {
  return request(`http://localhost:3000/user/${ID}`, "GET");
};

export const fetchSignUp = (userData: SignUpRequest) => {
  return request(
    `http://localhost:3000/sign-up`,
    "POST",
    JSON.stringify(userData)
  );
};

export const fetchSignIn = (userData: SignInRequest) => {
  return request(
    `http://localhost:3000/sign-in`,
    "POST",
    JSON.stringify(userData)
  );
};
