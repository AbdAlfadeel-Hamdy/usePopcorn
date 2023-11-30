import React from 'react';
import { WatchedMovie } from '../types/Movie';

const average = (arr: number[]) =>
  +arr
    .reduce((acc, cur, _, arr) => acc + (cur || 0) / arr.length, 0)
    .toFixed(1);

interface WatchedSummaryProps {
  watched: WatchedMovie[];
}

const WatchedSummary: React.FC<WatchedSummaryProps> = ({ watched }) => {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className='summary'>
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};

export default WatchedSummary;
