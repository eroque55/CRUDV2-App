import { StyledSpan } from './styles';

interface Props {
  children: React.ReactNode;
}

const ErrorSpan = ({ children }: Props) => {
  return <StyledSpan>{children}</StyledSpan>;
};

export default ErrorSpan;
