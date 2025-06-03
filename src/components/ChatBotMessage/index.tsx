import { format } from 'date-fns';
import { Container, MessageText, SendAtText } from './styles';

export interface MessageProps {
  message: string;
  sender: 'user' | 'bot';
  sendAt: Date;
}

const ChatBotMessage = ({ message, sender, sendAt }: MessageProps) => {
  return (
    <Container $sender={sender}>
      <MessageText>{message}</MessageText>
      <SendAtText>{format(sendAt, 'hh:mm')}</SendAtText>
    </Container>
  );
};

export default ChatBotMessage;
