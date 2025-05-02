import styled from 'styled-components';

export const ModalBodyContainer = styled.div`
  display: flex;
  padding: 0.75rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  flex: 1 0 0;
  align-self: stretch;
`;

export const ModalBodyTitle = styled.h3`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.neutral.color6};
  font-weight: ${({ theme }) => theme.fonts.roboto.regular};
`;

export const ModalBodyNotice = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.neutral.color4};
`;
