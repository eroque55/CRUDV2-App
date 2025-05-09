import styled from 'styled-components';

export const HeaderCategoriesContainer = styled.div`
  display: flex;
  padding: 0.5rem 2.5rem 1.75rem 2.5rem;
  align-items: center;
  gap: 1rem;
  align-self: stretch;
`;

interface StyledCategoryProps {
  $active?: boolean;
}

export const StyledCategory = styled.button<StyledCategoryProps>`
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary.color3 : theme.colors.neutral.color6};
  font-size: 1.25rem;
  background-color: transparent;
  border-radius: 0.75rem;
  padding: 0.25rem 0.75rem;
  border: none;
  cursor: pointer;

  font-weight: ${({ $active }) => ($active ? '700' : '400')};

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral.color2};
  }
`;
