import styled from 'styled-components';

interface Props {
  $active?: boolean;
}

export const Container = styled.div<Props>`
  display: flex;
  height: 1.25rem;
  width: 1.25rem;
  border-radius: 50%;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary.color3 : theme.colors.neutral.color};
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.primary.color3 : theme.colors.neutral.color4};

  justify-content: center;
  align-items: center;
`;

export const Circle = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.neutral.color};
`;
