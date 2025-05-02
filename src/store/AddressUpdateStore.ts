import { create } from 'zustand';
import IAddress from '../interfaces/IAddress';

interface UpdateAddressState {
  isOpen: boolean;
  address: IAddress | null;
  openModal: (address: IAddress) => void;
  closeModal: () => void;
}

export const useUpdateAddress = create<UpdateAddressState>(set => ({
  isOpen: false,
  address: null,
  openModal: address => set({ isOpen: true, address }),
  closeModal: () => set({ isOpen: false, address: null }),
}));
