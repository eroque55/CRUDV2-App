import styled from 'styled-components';

interface Props {
  $sender: 'user' | 'bot';
}

export const Container = styled.div<Props>`
  max-width: 85%;
  display: flex;
  padding: 8px 12px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.15);
  border-radius: 10px 10px
    ${({ $sender }) => ($sender === 'user' ? '2px 10px' : '10px 2px')};
  background: ${({ theme, $sender }) =>
    $sender === 'user'
      ? 'rgba(20, 110, 173, 0.50);'
      : theme.colors.neutral.color};
  align-self: ${({ $sender }) =>
    $sender === 'user' ? 'flex-end' : 'flex-start'};
`;

export const MessageText = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.neutral.color8};
  font-weight: 400;
`;

export const SendAtText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.neutral.color5};
  font-weight: 400;
`;
