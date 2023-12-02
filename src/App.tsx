import { useState, useCallback } from 'react';
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
import { WatchedMovie } from './types/Movie';
import { useMovies } from './hooks/useMovies';
import { useLocalStorageState } from './hooks/useLocalStorageState';

const App = () => {
  const [watched, setWatched] = useLocalStorageState<WatchedMovie[]>(
    [],
    'watched'
  );
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // Select Movie
  const handleSelectMovie = (id: string) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };
  // Close Movie
  const handleCloseMovie = useCallback(() => {
    setSelectedId(null);
  }, []);
  // Custom Hook
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);
  // Add to Watched
  const handleAddWatched = (movie: WatchedMovie) => {
    setWatched((watched) => [...watched, movie]);
  };
  // Remove from Watched
  const handelDeleteWatched = (id: string) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

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
};

export default App;
