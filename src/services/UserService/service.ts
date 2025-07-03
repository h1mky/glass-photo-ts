import { request } from "../../hook/http.hook";

export interface SignUpResponse {
  email: string;
  username: string;
  password: string;
  userPhoto: string;
}

export const fetchUserProfile = (ID: number) => {
  return request(`http://localhost:3000/user/${ID}`, "GET");
};

export const fetchSignUp = (userData: SignUpResponse) => {
  return request(
    `http://localhost:3000/sign-up`,
    "POST",
    JSON.stringify(userData)
  );
};
