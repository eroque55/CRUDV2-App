import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  flex: 1;
  width: 60%;
  background-color: ${({ theme }) => theme.colors.neutral.color};
  box-shadow: ${({ theme }) => theme.colors.other.shadow};
  border-radius: 1.25rem;
  align-items: center;
  justify-content: center;
  border: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.other.hoverBackground};
    cursor: pointer;
  }
`;
