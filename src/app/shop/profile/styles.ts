import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 2rem 2.5rem;
  gap: 2rem;
`;

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.25rem;
  width: 100%;
  height: fit-content;
`;

interface Props {
  $isActive?: boolean;
}

export const Tab = styled.h2<Props>`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary.color3 : theme.colors.neutral.color5};
  cursor: pointer;
`;

export const ContentContainer = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
`;
