import httpClient from "services/httpClient";
import { Movie } from "types/movie";

const BASE_URL = "series";

function getSeries(filters: object = {}): Promise<Movie[]> {
  return httpClient.get<Movie[]>(BASE_URL, { params: { ...filters } });
}

function getPopularSeries(): Promise<Movie[]> {
  return httpClient.get<Movie[]>(`${BASE_URL}/popular`);
}

function getLastestSeries(): Promise<Movie[]> {
  return httpClient.get<Movie[]>(`${BASE_URL}/lastest`);
}

function getRandomSeries(): Promise<Movie> {
  return httpClient.get<Movie>(`${BASE_URL}/random`);
}

export const SeriesService = { getSeries, getPopularSeries, getLastestSeries, getRandomSeries };
