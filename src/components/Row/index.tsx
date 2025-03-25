import IconComponent, { IconProps } from "../Icon";
import { RowText } from "../RowText/styles";
import { RowContainer, ContentContainer, ActionsContainer } from "./styles";

interface Props {
   content: string[];
   actions?: IconProps[];
}

const Row = ({ content, actions }: Props) => {
   return (
      <RowContainer>
         <ContentContainer>
            {content.map((item, index) => (
               <RowText key={index}>{item}</RowText>
            ))}
         </ContentContainer>
         <ActionsContainer>
            {actions
               ? actions.map((action, index) => (
                    <IconComponent key={index} icon={action} />
                 ))
               : "Ações"}
         </ActionsContainer>
      </RowContainer>
   );
};

export default Row;
