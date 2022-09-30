export interface Movie {
  id: number;
  title: number;
  description: number;
  release_date: Date;
  runtime: number;
  slug: string;
  genre: string;
  type: "movie" | "series";
  backdrop_img: string;
  poster_img: string;
}
