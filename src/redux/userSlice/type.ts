interface descriptionOrNull {
  string: string;
  valid: boolean;
}

export interface UserMain {
  id: number;
  username: string;
  description: descriptionOrNull;
  user_img: string;
}

export interface UserState {
  userMain: UserMain | null;
  error: string | null;
  loading: boolean;
}
