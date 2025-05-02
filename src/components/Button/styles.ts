import styled from 'styled-components';

interface StyledButtonProps {
  $width?: string;
  $wired?: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  width: ${({ $width }) => $width || '100%'};
  padding: 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.colors.primary.color3};

  font-size: 1rem;
  font-weight: 700;

  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }

  ${({ $wired, theme }) =>
    $wired
      ? `
      background-color: transparent;
      color: ${theme.colors.primary.color3};
      `
      : `
      background-color: ${theme.colors.primary.color3};
      color: ${theme.colors.neutral.color};
   `};
`;
