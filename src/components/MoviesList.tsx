import React from 'react';
import { Movie, WatchedMovie } from '../types/Movie';
import MovieItem from './MovieItem';

interface MoviesListProps {
  movies: Movie[] | WatchedMovie[];
  onSelectMovie?: (id: string) => void;
  onDeleteWatched?: (id: string) => void;
}

const MoviesList: React.FC<MoviesListProps> = ({
  movies,
  onSelectMovie,
  onDeleteWatched,
}) => {
  return (
    <ul className='list list-movies'>
      {movies?.map((movie) => (
        <MovieItem
          key={movie.imdbID}
          movie={movie}
          onSelectMovie={onSelectMovie}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
};

export default MoviesList;
