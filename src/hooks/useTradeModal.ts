import { useContext } from 'react';
import { TradeModalContext } from '../context/TradeModalContext';

const useTradeModal = () => {
  const { closeModal, openModal, saleId } = useContext(TradeModalContext);

  return {
    saleId,
    openModal,
    closeModal,
  };
};

export default useTradeModal;
