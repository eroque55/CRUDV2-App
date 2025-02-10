import {
   StyledInfoContainer,
   StyledInfoContent,
   StyledInfoTitle,
} from "./index.styles";

interface Props {
   title: string;
   children: React.ReactNode;
}

export default function InfoContainer({ title, children }: Props) {
   return (
      <StyledInfoContainer>
         <StyledInfoTitle>{title}</StyledInfoTitle>
         <StyledInfoContent>{children}</StyledInfoContent>
      </StyledInfoContainer>
   );
}
