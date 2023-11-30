import { useState, useEffect } from 'react';
import {
  NavBar,
  Logo,
  Search,
  NumResults,
  Main,
  Box,
  MoviesList,
  WatchedSummary,
  Loader,
  ErrorMessage,
  MovieDetails,
} from './components';
import { IMdbMovie, Movie, WatchedMovie } from './types/Movie';
import { API_KEY } from './utils/constants';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [watched, setWatched] = useState<WatchedMovie[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // Select Movie
  const handleSelectMovie = (id: string) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };
  // Close Movie
  const handleCloseMovie = () => {
    setSelectedId(null);
  };
  // Add to Watched
  const handleAddWatched = (movie: WatchedMovie) => {
    setWatched((watched) => [...watched, movie]);
  };
  // Remove from Watched
  const handelDeleteWatched = (id: string) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };
  // Fetch Movies
  useEffect(() => {
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
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
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
  }, [query]);

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              key={selectedId}
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <MoviesList
                movies={watched}
                onDeleteWatched={handelDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
