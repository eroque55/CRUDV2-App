import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 10px 12px;
  box-shadow: ${({ theme }) => theme.colors.other.shadow};
`;

interface Props {
  $disabled?: boolean;
}

export const InputContainer = styled.form<Props>`
  display: flex;
  padding: 10px 12px;
  gap: 10px;
  background-color: ${({ theme, $disabled }) =>
    !$disabled ? theme.colors.neutral.color2 : theme.colors.neutral.color3};
  width: 100%;
  border-radius: 10px;
`;

export const Input = styled.input`
  width: 100%;
  border: none;
  color: ${({ theme }) => theme.colors.neutral.color7};
  font-size: 16px;
  background-color: transparent;

  ::placeholder {
    color: ${({ theme }) => theme.colors.neutral.color5};
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
