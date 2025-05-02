import styled from 'styled-components';

export const PasswordContainer = styled.div`
  display: flex;
  padding: 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral.color4};
  width: 100%;
  background-color: ${({ theme }) => theme.colors.neutral.color};
  flex-direction: row;
  align-items: center;
`;

export const PasswordInput = styled.input`
  color: ${({ theme }) => theme.colors.neutral.color6};
  font-size: 1rem;
  width: 100%;
  border: none;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral.color3};
  }
`;
