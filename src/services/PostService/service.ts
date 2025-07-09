import { useQuery } from "@tanstack/react-query";
import { request } from "../../hook/http.hook";
import type { Photo, PostByID } from "./type";

export const useFetchAllPosts = () => {
  return useQuery<Photo[]>({
    queryKey: ["all-posts"],
    queryFn: async () => {
      const res = await request("http://localhost:3000/post", "GET");
      return res.data;
    },
  });
};

export const useFetchPostById = (id: number) => {
  return useQuery<PostByID>({
    queryKey: ["single-post", id],
    queryFn: async () => {
      const res = await request(`http://localhost:3000/post/${id}`, "GET");
      return res.data;
    },
    enabled: !!id,
  });
};

export const useFetchUserPosts = (id: number) => {
  return useQuery<Photo[]>({
    queryKey: ["user-posts", id],
    queryFn: async () => {
      const res = await request(`http://localhost:3000/userPost/${id}`, "GET");
      return res.data;
    },
    enabled: !!id,
  });
};
