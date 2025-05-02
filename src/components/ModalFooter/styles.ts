import styled from 'styled-components';

export const ModalFooterContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const ModalFooterButton = styled.button`
  display: flex;
  padding: 0.75rem 0rem;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  border: 1px solid ${({ theme }) => theme.colors.neutral.color3};
  background-color: ${({ theme }) => theme.colors.neutral.color};

  color: ${({ theme }) => theme.colors.primary.color2};
  font-size: 1rem;

  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
`;
