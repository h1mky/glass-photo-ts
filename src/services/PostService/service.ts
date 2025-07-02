import { request } from "../../hook/http.hook";

export const fetchAllPosts = () => {
  return request("http://localhost:3000/post", "GET");
};

export const fetchPost = (id: number) => {
  return request(`http://localhost:3000/post/${id}`, "GET");
};

export const fetchPostsUser = (id: number) => {
  return request(`http://localhost:3000/userPost/${id}`, "GET");
};
