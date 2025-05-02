import { useContext } from 'react';
import { CustomerFilterContext } from '@/src/context/CustomerFilterContext';

const useCustomerFilter = () => {
  const { filter, setFilter } = useContext(CustomerFilterContext);

  return { filter, setFilter };
};

export default useCustomerFilter;
