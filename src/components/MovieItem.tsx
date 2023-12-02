import React from 'react';
import { Movie, WatchedMovie } from '../types/Movie';

interface MovieItemProps {
  movie: Movie | WatchedMovie;
  onSelectMovie?: (id: string) => void;
  onDeleteWatched?: (id: string) => void;
}

const MovieItem: React.FC<MovieItemProps> = ({
  movie,
  onSelectMovie,
  onDeleteWatched,
}) => {
  return (
    <li key={movie.imdbID} onClick={() => onSelectMovie?.(movie.imdbID)}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      {'runtime' in movie ? (
        <div>
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.runtime}</span>
          </p>
          <button
            className='btn-delete'
            onClick={() => onDeleteWatched?.(movie.imdbID)}
          >
            X
          </button>
        </div>
      ) : (
        <div>
          <p>
            <span>🗓</span>
            <span>{movie.year}</span>
          </p>
        </div>
      )}
    </li>
  );
};

export default MovieItem;
