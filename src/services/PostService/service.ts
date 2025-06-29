import { request } from "../../hook/http.hook";

export const fetchAllPosts = async () => {
  try {
    const response = await request("http://localhost:3000/post", "GET");
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const fetchPost = async (id: number) => {
  try {
    const response = await request(`http://localhost:3000/post/${id}`, "GET");
    return response.data;
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    throw error;
  }
};
