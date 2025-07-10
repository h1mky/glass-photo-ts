import { useMutation, useQuery } from "@tanstack/react-query";
import { request } from "../../hook/http.hook";

export interface CreateComment {
  content: string;
}

export interface CreateCommentPayload {
  id: string;
  content: string;
}

export interface CommentsItem {
  id: number;
  userId: number;
  userImg: string;
  userName: string;
  content: string;
  created_at: Date;
  onDelete?: (id: number) => void;
}

export const useCommentsGet = (postId: string) => {
  return useQuery<CommentsItem[]>({
    queryKey: ["comments-post", postId],
    queryFn: async () => {
      const res = await request<CommentsItem[]>(
        `http://localhost:3000/comments/${postId}`,
        "GET"
      );
      return res.data;
    },
    enabled: !!postId,
  });
};

export const useCommentsPost = (postId: string) => {
  return useMutation({
    mutationFn: (body: CreateComment) =>
      request(
        `http://localhost:3000/comments/${postId}`,
        "POST",
        JSON.stringify(body)
      ),
  });
};

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: (commentId: number) =>
      request(`http://localhost:3000/comments/${commentId}`, "DELETE"),
    onError: (error) => console.log(error),
  });
};
