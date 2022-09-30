import { useMutation, useQuery, useQueryClient } from "react-query";
import { FavoriteService } from "services/movies";
import { Movie } from "types/movie";

const QUERY_KEY = "favorites";

export function useFavorites() {
  const queryClient = useQueryClient();

  const favoritesQuery = useQuery<Movie[], Error>([QUERY_KEY], FavoriteService.getFavorites);

  const addFavorite = useMutation((id: number) => FavoriteService.addToFavorite(id), {
    onSuccess: (movie: Movie) => {
      queryClient.setQueryData<Movie[]>([QUERY_KEY], (prevFavorites: Movie[] = []) => [
        ...prevFavorites,
        movie,
      ]);
      queryClient.invalidateQueries([QUERY_KEY]);
    },
  });

  const removeFavorite = useMutation((id: number) => FavoriteService.removeFromFavorite(id), {
    onSuccess: (movie: Movie) => {
      queryClient.setQueryData<Movie[]>([QUERY_KEY], (prevFavorites: Movie[] = []) =>
        prevFavorites?.filter((favorite) => favorite.id !== movie.id),
      );
      queryClient.invalidateQueries([QUERY_KEY]);
    },
  });

  return {
    favorites: {
      ...favoritesQuery,
      invalidate: queryClient.invalidateQueries([QUERY_KEY]),
    },
    addFavorite,
    removeFavorite,
  };
}

export function useCheckFavorite(id: number) {
  const queryClient = useQueryClient();
  const checkFavoriteQuery = useQuery<boolean, Error>(
    ["checkFavorite", id],
    () => FavoriteService.checkIfFavorite(id),
    { cacheTime: 0 },
  );

  return {
    ...checkFavoriteQuery,
    invalidate: queryClient.invalidateQueries(["checkFavorite", id]),
  };
}
