import httpClient from "services/httpClient";
import { Movie } from "types/movie";

const BASE_URL = "movies";

function getMovies(filters: object = {}): Promise<Movie[]> {
  return httpClient.get<Movie[]>(BASE_URL, { params: { ...filters } });
}

function getPopularMovies(): Promise<Movie[]> {
  return httpClient.get<Movie[]>(`${BASE_URL}/popular`);
}

function getLastestMovies(): Promise<Movie[]> {
  return httpClient.get<Movie[]>(`${BASE_URL}/lastest`);
}

function getMovie(id: number): Promise<Movie> {
  return httpClient.get<Movie>(`${BASE_URL}/${id}`);
}

function getRandomMovie(): Promise<Movie> {
  return httpClient.get<Movie>(BASE_URL);
}

export const MovieService = {
  getMovies,
  getPopularMovies,
  getLastestMovies,
  getMovie,
  getRandomMovie,
};
