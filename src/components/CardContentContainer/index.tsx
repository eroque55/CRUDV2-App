import {
  StyledInfoContainer,
  StyledInfoContent,
  StyledInfoTitle,
} from './styles';

export interface CardContentProps {
  title: string;
  children: React.ReactNode;
}

const CardContent = ({ title, children }: CardContentProps) => {
  return (
    <StyledInfoContainer>
      <StyledInfoTitle>{title}</StyledInfoTitle>
      <StyledInfoContent>{children}</StyledInfoContent>
    </StyledInfoContainer>
  );
};

export default CardContent;
