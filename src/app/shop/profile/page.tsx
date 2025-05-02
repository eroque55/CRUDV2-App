'use client';

import Header from '@/src/components/Header';
import { useState } from 'react';
import useAuthStore from '@/src/store/CustomerShopStore';
import CardAddress from '@/src/components/CardAddress';
import CardCard from '@/src/components/CardCard';
import { Container, TabsContainer, Tab, ContentContainer } from './styles';

const ProfilePage = () => {
  const { customer } = useAuthStore();
  const [tab, setTab] = useState(0);

  return (
    <>
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
          {tab === 2 &&
            customer?.addresses.map(address => (
              <CardAddress
                key={address.id}
                address={address}
                style={{ width: '100%' }}
              />
            ))}
          {tab === 3 &&
            customer?.cards.map(card => (
              <CardCard key={card.id} card={card} style={{ width: '100%' }} />
            ))}
        </ContentContainer>
      </Container>
    </>
  );
};

export default ProfilePage;
