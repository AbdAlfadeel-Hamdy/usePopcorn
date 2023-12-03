import { useEffect, useState, useRef } from 'react';
import StarRating from './StarRating';
import { Loader, ErrorMessage } from '.';
import { IMdbMovie, WatchedMovie } from '../types/Movie';
import { API_KEY } from '../utils/constants';
import { useKey } from '../hooks/useKey';

interface MovieDetailsProps {
  selectedId: string;
  onCloseMovie: () => void;
  onAddWatched: (movie: WatchedMovie) => void;
  watched: WatchedMovie[];
}

const MovieDetails: React.FC<MovieDetailsProps> = ({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) => {
  const [movie, setMovie] = useState<IMdbMovie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);
  const countRef = useRef(0);
  // Check Movie is already Rated
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;
  // Add to Watched
  const handleAdd = () => {
    let watchedMovie: WatchedMovie | null = null;
    if (movie && userRating)
      watchedMovie = {
        imdbID: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
        runtime: +movie.Runtime.split(' ')[0],
        imdbRating: +movie.imdbRating,
        userRating,
        countRatingDecisions: countRef.current,
      };
    if (watchedMovie) onAddWatched(watchedMovie);
    onCloseMovie();
  };
  // Get Movie Details
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
        );
        if (!res.ok)
          throw new Error('Something went wrong with fetching the movie');

        const data = (await res.json()) as IMdbMovie;
        if (!data) throw new Error('Movie not found');

        setMovie(data);
      } catch (err) {
        setError((err as Error)?.message);
      }
      setIsLoading(false);
    })();
  }, [selectedId]);
  // Change Page Title
  useEffect(() => {
    document.title = `Movie | ${movie?.Title}` || 'usePopcorn';
    return () => {
      document.title = 'usePopcorn';
    };
  }, [movie?.Title]);
  // Listen for the Escape Key
  useKey('Escape', onCloseMovie);

  return (
    <div className='details'>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <header>
            <button className='btn-back' onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={movie?.Poster} alt={`Poster of ${movie?.Title} movie`} />
            <div className='details-overview'>
              <h2>{movie?.Title}</h2>
              <p>
                {movie?.Released} &bull; {movie?.Runtime}
              </p>
              <p>{movie?.Genre}</p>
              <p>
                <span>⭐</span>
                {movie?.imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className='rating'>
              {watchedUserRating ? (
                <p>
                  You rated this movie with {watchedUserRating} <span>⭐</span>
                </p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={(rating) => {
                      countRef.current++;
                      setUserRating(rating);
                    }}
                  />
                  {userRating && (
                    <button className='btn-add' onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <p style={{ fontStyle: 'italic' }}>{movie?.Plot}</p>
            <p>Starring {movie?.Actors}</p>
            <p>Directed by {movie?.Director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
