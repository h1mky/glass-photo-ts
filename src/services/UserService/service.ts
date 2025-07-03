import { request } from "../../hook/http.hook";

export const fetchUserProfile = (ID: number) => {
  return request(`http://localhost:3000/user/${ID}`, "GET");
};
