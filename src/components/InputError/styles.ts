import styled from 'styled-components';

export const StyledSpan = styled.span`
  display: flex;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.alerts.fail};
  max-height: 0.75rem;
  align-items: flex-end;
  text-align: right;
`;
