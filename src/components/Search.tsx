import { useRef, useCallback } from 'react';
import { useKey } from '../hooks/useKey';

interface SearchProps {
  query: string;
  setQuery: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ query, setQuery }) => {
  const inputEl = useRef<HTMLInputElement>(null);
  // Focus Search Input on Press "Enter"
  useKey(
    'Enter',
    useCallback(() => {
      if (document.activeElement === inputEl.current) return;
      inputEl.current?.focus();
      setQuery('');
    }, [setQuery])
  );

  return (
    <input
      ref={inputEl}
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default Search;
