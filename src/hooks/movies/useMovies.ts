import { useQuery, useQueryClient } from "react-query";
import { MovieService } from "services/movies";
import { Movie } from "types/movie";

export function useMovies(filters?: object) {
  const queryClient = useQueryClient();

  const generalMoviesQuery = useQuery<Movie[], Error>(
    ["generalMovies", filters],
    () => MovieService.getMovies(filters),
    {
      enabled: Boolean(filters),
    },
  );
  const popularMoviesQuery = useQuery<Movie[], Error>(
    ["popularMovies"],
    MovieService.getPopularMovies,
    {
      enabled: Boolean(!filters),
    },
  );
  const lastestMoviesQuery = useQuery<Movie[], Error>(
    ["lastestMovies"],
    MovieService.getLastestMovies,
    {
      enabled: Boolean(!filters),
    },
  );

  return {
    generalMovies: {
      ...generalMoviesQuery,
      invalidate: queryClient.invalidateQueries(["generalMovies", filters]),
    },
    popularMovies: {
      ...popularMoviesQuery,
      invalidate: queryClient.invalidateQueries(["popularMovies"]),
    },
    lastestMovies: {
      ...lastestMoviesQuery,
      invalidate: queryClient.invalidateQueries(["lastestMovies"]),
    },
  };
}

export function useMovie(id?: number) {
  const queryClient = useQueryClient();

  const queryKey = id ? ["movie", id] : ["randomMovie"];

  const queryFn = id ? MovieService.getMovie(id) : MovieService.getRandomMovie();
  const movieQuery = useQuery<Movie, Error>(queryKey, () => queryFn);

  return { ...movieQuery, invalidate: queryClient.invalidateQueries(queryKey) };
}
