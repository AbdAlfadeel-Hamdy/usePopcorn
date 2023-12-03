import { useState, useEffect } from 'react';
import { Movie, IMdbMovie } from '../types/Movie';
import { API_KEY } from '../utils/constants';

export const useMovies = (query: string, callback?: () => void) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  // Fetch Movies
  useEffect(() => {
    callback?.();
    if (query.length < 3) {
      setError(null);
      setMovies([]);
      return;
    }
    // const controller = new AbortController();
    const timer = setTimeout(async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
          // {
          //   signal: controller.signal,
          // }
        );
        if (!res.ok)
          throw new Error('Something went wrong with fetching movies');

        const data = (await res.json()) as { Search: IMdbMovie[] };
        if (!data.Search) throw new Error('Movie not found');

        setMovies(
          data.Search.map((movie) => ({
            imdbID: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
          }))
        );
      } catch (err) {
        // if ((err as Error).name !== 'AbortError')
        setError((err as Error)?.message);
      }
      setIsLoading(false);
    }, 1000);
    // Clean Up Function
    return () => {
      // controller.abort();
      clearTimeout(timer);
    };
  }, [query, callback]);

  return {
    movies,
    isLoading,
    error,
  };
};
