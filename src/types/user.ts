import { Movie } from "./movie";

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  status?: boolean;
  photo_url: string;
  favorite_movies?: Movie[];
}
