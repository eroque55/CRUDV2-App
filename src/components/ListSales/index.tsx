'use client';

import ISale from '@/src/interfaces/ISale';
import { useEffect, useState } from 'react';
import { errorModal } from '@/src/utils/Toasts';
import { getSales } from '@/src/services/Sale.service';
import Row from '../Row';
import { ListContainer } from '../List/styles';
import RowSale from '../RowSale';
import Loader from '../Loader';

const ListSales = () => {
  const headerContent = ['Id', 'Nome do cliente', 'Data da venda', 'Status'];
  const [sales, setSales] = useState<ISale[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [update, setUpdate] = useState(false);

  const fetchSales = async () => {
    try {
      setIsLoading(true);
      const response = await getSales();
      if (!response) {
        throw new Error('Erro ao carregar vendas');
      }
      setSales(response);
      setIsLoading(false);
    } catch (error: any) {
      errorModal(error.message);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  useEffect(() => {
    if (update) {
      fetchSales();
      setUpdate(false);
    }
  }, [update]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ListContainer>
      <Row content={headerContent} />
      {sales.map(sale => (
        <RowSale key={sale.id} sale={sale} setUpdate={setUpdate} />
      ))}
    </ListContainer>
  );
};

export default ListSales;
