import { useState } from 'react';
import IconComponent from '../Icon';
import { Button, Container, Input, InputContainer } from './styles';

interface Props {
  sendMessage: (message: string) => void;
  isLoading?: boolean;
}

const ChatBotInput = ({ sendMessage, isLoading }: Props) => {
  const [message, setMessage] = useState('');

  return (
    <Container>
      <InputContainer $disabled={isLoading}>
        <Input
          type="text"
          placeholder="Digite sua mensagem..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          disabled={isLoading}
        />
        <Button
          type="submit"
          onClick={e => {
            e.preventDefault();
            setMessage('');
            sendMessage(message);
          }}
        >
          <IconComponent name="SendIcon" size={20} />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default ChatBotInput;
