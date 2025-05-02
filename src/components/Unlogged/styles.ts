import Link from 'next/link';
import styled from 'styled-components';

export const UnloggedContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const StyledMessage = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral.color6};
`;

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary.color3};
`;
