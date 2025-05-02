'use client';

import NavBar from '@/src/components/NavBar';
import { ToastContainer } from 'react-toastify';
import { StyledContent, StyledMain } from './styles';

interface Props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <StyledMain>
      <ToastContainer />
      <NavBar />
      <StyledContent>{children}</StyledContent>
    </StyledMain>
  );
};

export default AdminLayout;
