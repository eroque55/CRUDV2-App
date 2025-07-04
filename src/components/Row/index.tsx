import IconComponent, { IconProps } from '../Icon';
import { RowText } from '../RowText/styles';
import { RowContainer, ContentContainer, ActionsContainer } from './styles';

interface Props {
  content: string[];
  actions?: IconProps[];
}

const Row = ({ content, actions }: Props) => {
  return (
    <RowContainer>
      <ContentContainer>
        {content.map(item => (
          <RowText key={item}>{item}</RowText>
        ))}
      </ContentContainer>

      <ActionsContainer>
        {actions
          ? actions.map(action => (
              <IconComponent key={action.name} icon={action} />
            ))
          : 'Ações'}
      </ActionsContainer>
    </RowContainer>
  );
};

export default Row;
