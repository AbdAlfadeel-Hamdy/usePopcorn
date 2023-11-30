import { Movie } from '../types/Movie';

interface NumResultsProps {
  movies: Movie[];
}

const NumResults: React.FC<NumResultsProps> = ({ movies }) => {
  return (
    <p className='num-results'>
      Found <strong>{movies.length}</strong> results
    </p>
  );
};

export default NumResults;
