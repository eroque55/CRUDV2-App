import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  padding: 2rem 2.5rem;
  gap: 5rem;
`;

export const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 2rem;
`;

export const SumaryContainer = styled.div`
  display: flex;
  width: 23rem;
  gap: 6rem;
  flex-direction: column;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral.color3};
  padding: 1.25rem;
  height: fit-content;
`;

export const SumaryHeader = styled.div`
  flex-direction: column;
  display: flex;
  gap: 1.25rem;
`;

export const SumaryTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.neutral.color8};
`;

export const SumaryContent = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
`;

export const SumaryItem = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const SumaryItemLabel = styled.p`
  color: ${({ theme }) => theme.colors.neutral.color7};
  flex: 1;
`;

export const SumaryItemValue = styled.p`
  color: ${({ theme }) => theme.colors.neutral.color5};
`;

export const SumaryItemTotal = styled.p`
  color: ${({ theme }) => theme.colors.neutral.color7};
  font-size: 1.25rem;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;
