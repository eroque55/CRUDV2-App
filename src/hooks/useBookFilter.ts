import { useContext } from 'react';
import { BookFilterContext } from '@/src/context/BookFilterContext';

const useBookFilter = () => {
  const { title, setTitle } = useContext(BookFilterContext);

  return { title, setTitle };
};

export default useBookFilter;
