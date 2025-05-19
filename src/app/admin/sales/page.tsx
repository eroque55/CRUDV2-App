'use client';

import { Title } from '@/src/components/Title';
import ListSales from '@/src/components/ListSales';
import { StyledContentHeader } from '../styles';

const SalesPage = () => {
  return (
    <>
      <StyledContentHeader>
        <Title>Vendas</Title>
        <div style={{ height: 48 }} />
      </StyledContentHeader>
      <ListSales />
    </>
  );
};

export default SalesPage;
