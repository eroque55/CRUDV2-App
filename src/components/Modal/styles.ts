import styled from 'styled-components';

interface ModalContainerProps {
  $width?: string;
  $height?: string;
}

export const ModalContainer = styled.form<ModalContainerProps>`
  display: flex;
  width: ${({ $width }) => $width || '25rem'};
  height: ${({ $height }) => $height || 'auto'};
  flex-direction: column;
  border-radius: 0.5rem;
  border: none;
  padding: 0;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.colors.other.shadow};
  background-color: ${({ theme }) => theme.colors.neutral.color};
`;
