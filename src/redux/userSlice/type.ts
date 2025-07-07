export interface UserMain {
  id: number;
  username: string;
  description: string;
  user_img: string;
}

export interface UserState {
  userMain: UserMain | null;
  error: string | null;
  loading: boolean;
}
