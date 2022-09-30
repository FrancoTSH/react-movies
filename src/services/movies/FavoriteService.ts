import httpClient from "services/httpClient";
import { Movie } from "types/movie";

const BASE_URL = "favorites";

function getFavorites(): Promise<Movie[]> {
  return httpClient.get<Movie[]>(BASE_URL);
}

function addToFavorite(movie_id: Movie["id"]): Promise<Movie> {
  return httpClient.post<Movie>(BASE_URL, { movie_id });
}

async function checkIfFavorite(id: number): Promise<boolean> {
  const { favorite } = await httpClient.get<{ favorite: boolean }>(`${BASE_URL}/${id}`);

  return favorite;
}

function removeFromFavorite(id: number): Promise<Movie> {
  return httpClient.delete<Movie>(`${BASE_URL}/${id}`);
}

export const FavoriteService = { getFavorites, addToFavorite, checkIfFavorite, removeFromFavorite };
