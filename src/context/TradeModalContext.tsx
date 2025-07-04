import { createContext, PropsWithChildren, useState } from 'react';

export const TradeModalContext = createContext({
  saleId: null as number | null,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  openModal: (id: number) => {},

  closeModal: () => {},
});

const TradeModalProvider = ({ children }: PropsWithChildren) => {
  const [saleId, setSaleId] = useState<number | null>(null);

  const openModal = (id: number) => {
    setSaleId(id);
  };

  const closeModal = () => {
    setSaleId(null);
  };

  return (
    <TradeModalContext.Provider value={{ saleId, openModal, closeModal }}>
      {children}
    </TradeModalContext.Provider>
  );
};

export default TradeModalProvider;
