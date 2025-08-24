export interface Comment {
  id: number;
  user: string;
  avatar: string;
  content: string;
  likes: number;
  liked: boolean;
  timestamp: string;
}