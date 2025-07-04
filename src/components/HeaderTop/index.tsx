import { useRouter } from 'next/navigation';
import useAuthStore from '@/src/store/CustomerShopStore';
import { confirmationModal } from '@/src/utils/Toasts';
import { HeaderTopContainer, StyledHello, StyledLogoutButton } from './styles';
import IconComponent from '../Icon';

const HeaderTop = () => {
  const { customer, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <HeaderTopContainer>
      <StyledHello>
        Olá, <strong>{customer?.name}</strong>
      </StyledHello>

      <StyledLogoutButton
        onClick={() =>
          confirmationModal({
            title: 'Sair',
            message: 'Deseja realmente sair?',
            confirmButton: 'Sair',
            cancelButton: 'Voltar',
            confirmAction: handleLogout,
          })
        }
      >
        Sair
        <IconComponent name="ExitBlueIcon" />
      </StyledLogoutButton>
    </HeaderTopContainer>
  );
};

export default HeaderTop;
