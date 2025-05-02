import styled from 'styled-components';

export const RowContainer = styled.li`
  display: flex;
  padding: 0.75rem 1.25rem;
  align-items: center;
  gap: 2.5rem;
  align-self: stretch;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.neutral.color};
  box-shadow: ${({ theme }) => theme.colors.other.shadow};
`;

export const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  flex: 1 0 0;
`;

export const ActionsContainer = styled.div`
  display: flex;
  width: 8.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;

  color: ${({ theme }) => theme.colors.neutral.color7};
  font-size: 1rem;
`;
