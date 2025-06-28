import { request } from "../../hook/http.hook";

export const fetchComments = async (postId: string) => {
  try {
    const response = await request(
      `http://localhost:3000/comments/${postId}`,
      "GET"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};
