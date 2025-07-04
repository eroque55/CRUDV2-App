import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 1.25rem;
  padding: 1.25rem;
  align-items: center;

  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral.color3};

  width: 100%;

  cursor: pointer;
`;
