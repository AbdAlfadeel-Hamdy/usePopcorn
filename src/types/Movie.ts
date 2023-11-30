export type Movie = {
  imdbID: string;
  title: string;
  year: string;
  poster: string;
};

export type WatchedMovie = Movie & {
  runtime: number;
  imdbRating: number;
  userRating: number;
};

export type IMdbMovie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  imdbRating: string;
  Runtime: string;
  Released: string;
  Plot: string;
  Actors: string;
  Director: string;
  Genre: string;
};
