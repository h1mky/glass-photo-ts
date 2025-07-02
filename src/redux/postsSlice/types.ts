export interface Photo {
  id: number;
  post_img: string;
  username: string;
  title: string;
}

export interface PostByID {
  post_id: number;
  post_author: string;
  post_author_img: string;
  post_img: string;
  title: string;
  created_at: Date;
}

export interface PostsState {
  photos: Photo[] | null;
  postById: PostByID | null;
  userPosts: Photo[] | null;
  error: string | null;
  loading: boolean;
}
