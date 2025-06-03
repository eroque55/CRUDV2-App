import { useState } from 'react';
import IconComponent from '../Icon';
import { ClosedContainer } from './styles';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ClosedContainer>
      <IconComponent name="ChatIcon" size={28} />
    </ClosedContainer>
  );
};

export default ChatBot;
