import styled from 'styled-components';

export const ClosedContainer = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;
  height: 56px;
  width: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary.color3};
  border-radius: 999px;
  box-shadow: ${({ theme }) => theme.colors.other.shadow};
  cursor: pointer;

  &:hover {
    filter: ${({ theme }) => theme.colors.other.hoverFilter};
  }
`;
