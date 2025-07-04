'use client';

import Header from '@/src/components/Header';
import { useEffect, useState } from 'react';
import useAuthStore from '@/src/store/CustomerShopStore';
import CardShopPersonalData from '@/src/components/CardShopPersonalData';
import Loader from '@/src/components/Loader';
import { getCustomer } from '@/src/services/Customer.service';
import CardShopCard from '@/src/components/CardShopCard';
import CardShopAddress from '@/src/components/CardShopAddress';
import { getSaleByCustomer } from '@/src/services/Sale.service';
import ISale from '@/src/interfaces/ISale';
import CardShopSale from '@/src/components/CardShopSale';
import CardCreate from '@/src/components/CardCreate';
import TradeModalProvider from '@/src/context/TradeModalContext';
import ModalTrade from '@/src/components/ModalTrade';
import { Container, TabsContainer, Tab, ContentContainer } from './styles';

const ProfilePage = () => {
  const { customer, login } = useAuthStore();
  const [tab, setTab] = useState(0);
  const [sales, setSales] = useState<ISale[]>([]);
  const [updateSales, setUpdateSales] = useState(false);
  const {
    data: customerData,
    refetch,
    isLoading,
  } = getCustomer(customer?.id || 0);
  const [updateCustomer, setUpdateCustomer] = useState(false);

  const fetchSales = async () => {
    if (customer) {
      const salesData = await getSaleByCustomer(customer.id);
      setSales(salesData);
    }
  };

  useEffect(() => {
    if (customerData) {
      login(customerData);
    }

    refetch();
    fetchSales();
  }, []);

  useEffect(() => {
    if (updateSales) {
      fetchSales();
      setUpdateSales(false);
    }
  }, [updateSales]);

  useEffect(() => {
    if (updateCustomer) {
      refetch();
      setUpdateCustomer(false);
    }
  }, [updateCustomer]);

  if (!customerData || isLoading) {
    return <Loader />;
  }

  return (
    <TradeModalProvider>
      <Header />

      <Container>
        <TabsContainer>
          <Tab $isActive={tab === 0} onClick={() => setTab(0)}>
            Dados pessoais
          </Tab>

          <Tab $isActive={tab === 1} onClick={() => setTab(1)}>
            Compras
          </Tab>

          <Tab $isActive={tab === 2} onClick={() => setTab(2)}>
            Endereços
          </Tab>

          <Tab $isActive={tab === 3} onClick={() => setTab(3)}>
            Cartões
          </Tab>
        </TabsContainer>

        <ContentContainer>
          {tab === 0 && (
            <CardShopPersonalData
              customer={customerData}
              style={{ width: '48%' }}
            />
          )}

          {tab === 1 &&
            sales.map(sale => (
              <CardShopSale
                key={sale.id}
                sale={sale}
                style={{ width: '48%' }}
              />
            ))}

          {tab === 2 && (
            <>
              {customerData?.addresses.map(address => (
                <CardShopAddress
                  key={address.id}
                  address={address}
                  style={{ width: '48%' }}
                  setUpdate={setUpdateCustomer}
                />
              ))}

              <CardCreate style={{ maxWidth: '48%', minHeight: 386 }} />
            </>
          )}

          {tab === 3 && (
            <>
              {customerData?.cards.map(card => (
                <CardShopCard
                  key={card.id}
                  card={card}
                  style={{ width: '48%' }}
                  setUpdate={setUpdateCustomer}
                />
              ))}

              <CardCreate style={{ maxWidth: '48%', minHeight: 142 }} />
            </>
          )}
        </ContentContainer>
      </Container>

      <ModalTrade setUpdate={setUpdateSales} />
    </TradeModalProvider>
  );
};

export default ProfilePage;
