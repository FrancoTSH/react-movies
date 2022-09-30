import { useQuery, useQueryClient } from "react-query";
import { SeriesService } from "services/movies";
import { Movie } from "types/movie";

export function useSeries(filters?: object) {
  const queryClient = useQueryClient();

  const generalSeriesQuery = useQuery<Movie[], Error>(
    ["generalSeries", filters],
    () => SeriesService.getSeries(filters),
    {
      enabled: Boolean(filters),
    },
  );
  const popularSeriesQuery = useQuery<Movie[], Error>(
    ["popularSeries"],
    SeriesService.getPopularSeries,
    {
      enabled: Boolean(!filters),
    },
  );
  const lastestSeriesQuery = useQuery<Movie[], Error>(
    ["lastestSeries"],
    SeriesService.getLastestSeries,
    {
      enabled: Boolean(!filters),
    },
  );

  return {
    generalSeries: {
      ...generalSeriesQuery,
      invalidate: queryClient.invalidateQueries(["generalSeries", filters]),
    },
    popularSeries: {
      ...popularSeriesQuery,
      invalidate: queryClient.invalidateQueries(["popularSeries"]),
    },
    lastestSeries: {
      ...lastestSeriesQuery,
      invalidate: queryClient.invalidateQueries(["lastestSeries"]),
    },
  };
}

export function useSerie() {
  const queryClient = useQueryClient();

  const serieQuery = useQuery<Movie, Error>(["randomSeries"], () =>
    SeriesService.getRandomSeries(),
  );

  return { ...serieQuery, invalidate: queryClient.invalidateQueries(["randomSeries"]) };
}
