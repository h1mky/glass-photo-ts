import { request } from "../../hook/http.hook";

export interface CreateComment {
  content: string;
}

export interface CreateCommentPayload {
  id: string;
  content: string;
}

export const fetchComments = (postId: string) => {
  return request(`http://localhost:3000/comments/${postId}`, "GET");
};

export const postComments = (postId: string, body: CreateComment) => {
  return request(
    `http://localhost:3000/comments/${postId}`,
    "POST",
    JSON.stringify(body)
  );
};
