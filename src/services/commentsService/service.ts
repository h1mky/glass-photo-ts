import { request } from "../../hook/http.hook";

export const fetchComments = (postId: string) => {
  return request(`http://localhost:3000/comments/${postId}`, "GET");
};
