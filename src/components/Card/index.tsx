import CardButton, { CardButtonProps } from "../CardButton";
import CardContent, { CardContentProps } from "../CardContentContainer";
import { CardContainer, ButtonsContainer } from "./styles";

export interface CardProps {
   cardContent: CardContentProps[];
   cardButtons?: CardButtonProps[];
   active?: boolean;
}

const Card = ({ cardContent, active = false, cardButtons }: CardProps) => {
   return (
      <CardContainer $isPreferential={active}>
         <ButtonsContainer>
            {cardButtons?.map((button, index) => (
               <CardButton
                  key={index}
                  icon={button.icon}
                  onClick={button.onClick}
               />
            ))}
         </ButtonsContainer>
         {cardContent.map((content) => (
            <CardContent key={content.title} title={content.title}>
               {content.children}
            </CardContent>
         ))}
      </CardContainer>
   );
};

export default Card;
