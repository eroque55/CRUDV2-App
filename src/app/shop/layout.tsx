'use client';

import Footer from '@/src/components/Footer';
import Unlogged from '@/src/components/Unlogged';
import { BookFilterProvider } from '@/src/context/BookFilterContext';
import { CategoryFilterProvider } from '@/src/context/CategoryFilterContext';
import useAuthStore from '@/src/store/CustomerShopStore';
import { PropsWithChildren, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

const ShopLayout = ({ children }: PropsWithChildren) => {
  const { customer, loadUser } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, []);

  if (!customer) {
    return <Unlogged />;
  }

  return (
    <BookFilterProvider>
      <CategoryFilterProvider>
        <ToastContainer />
        {children}
        <Footer />
      </CategoryFilterProvider>
    </BookFilterProvider>
  );
};

export default ShopLayout;
