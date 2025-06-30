export interface CommentsItem {
  idComment: number;
  userId: number;
  userImg: string;
  userName: string;
  content: string;
  created_at: Date;
}

export interface CommentsState {
  comments: CommentsItem[] | null;
  loading: boolean;
  error: string | null;
}
