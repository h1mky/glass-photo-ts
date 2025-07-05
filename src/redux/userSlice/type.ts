export interface UserMain {
  id: number;
  user_img: string;
}

export interface UserState {
  userMain: UserMain | null;
  error: string | null;
  loading: boolean;
}
