import { CSSProperties } from 'styled-components';
import CardButton, { CardButtonProps } from '../CardButton';
import CardContent, { CardContentProps } from '../CardContentContainer';
import { CardContainer, ButtonsContainer } from './styles';

export interface CardProps {
  cardContent: CardContentProps[];
  cardButtons?: CardButtonProps[];
  active?: boolean;
  style?: CSSProperties;
}

const Card = ({
  cardContent,
  active = false,
  cardButtons,
  style,
}: CardProps) => {
  return (
    <CardContainer $isPreferential={active} style={style}>
      <ButtonsContainer>
        {cardButtons?.map(button => (
          <CardButton
            key={button.icon}
            icon={button.icon}
            onClick={button.onClick}
          />
        ))}
      </ButtonsContainer>
      {cardContent.map(content => (
        <CardContent key={content.title} title={content.title}>
          {content.children}
        </CardContent>
      ))}
    </CardContainer>
  );
};

export default Card;
