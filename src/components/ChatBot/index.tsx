import { useState } from 'react';
import { generateResponse } from '@/src/services/Ai.service';
import IconComponent from '../Icon';
import {
  ChatBotHeader,
  ChatBotTitle,
  ClosedContainer,
  LoaderContainer,
  MessagesContainer,
  OpenContainer,
} from './styles';
import ChatBotMessage, { MessageProps } from '../ChatBotMessage';
import ChatBotInput from '../ChatBotInput';
import Loader from '../Loader';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageProps[]>([
    {
      message: 'Olá! Como posso ajudar você hoje?',
      sender: 'bot',
      sendAt: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleChatBot = () => {
    setIsOpen(prevState => !prevState);
  };

  const sendMessage = async (message: string) => {
    try {
      if (message.trim()) {
        setIsLoading(true);
        setMessages(prev => [
          ...prev,
          { message, sender: 'user', sendAt: new Date() },
        ]);

        const response = await generateResponse(message);
        setMessages(prev => [
          ...prev,
          { message: response, sender: 'bot', sendAt: new Date() },
        ]);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error generating response:', error);
    }
  };

  if (!isOpen) {
    return (
      <ClosedContainer onClick={toggleChatBot}>
        <IconComponent name="ChatIcon" size={28} />
      </ClosedContainer>
    );
  }

  return (
    <OpenContainer>
      <ChatBotHeader>
        <ChatBotTitle>Fale conosco</ChatBotTitle>
        <IconComponent name="CloseIcon" size={24} onClick={toggleChatBot} />
      </ChatBotHeader>
      <MessagesContainer>
        {messages.map(message => (
          <ChatBotMessage
            message={message.message}
            sender={message.sender}
            sendAt={message.sendAt}
            key={message.sendAt.toISOString()}
          />
        ))}
        {isLoading && (
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        )}
      </MessagesContainer>
      <ChatBotInput sendMessage={sendMessage} isLoading={isLoading} />
    </OpenContainer>
  );
};

export default ChatBot;
