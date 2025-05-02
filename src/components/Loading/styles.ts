import styled from 'styled-components';

export const StyledMain = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

export const StyledText = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.neutral.color4};
`;
