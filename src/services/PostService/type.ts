export interface Photo {
  id: number;
  post_img: string;
  username: string;
  title: string;
}

export interface DescriptionOrImage {
  String: string;
  Valid: boolean;
}

export interface PostByID {
  post_id: number;
  description: DescriptionOrImage;
  post_author: string;
  post_author_id: number;
  post_author_img: string;
  post_img: string;
  title: string;
  created_at: Date;
}
