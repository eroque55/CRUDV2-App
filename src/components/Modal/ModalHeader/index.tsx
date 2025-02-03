import { StyledModalHeader, StyledModalHeaderTitle } from "./index.styled";

interface Props {
   children: React.ReactNode;
}

export default function ModalHeader({ children }: Props) {
   return (
      <StyledModalHeader>
         <StyledModalHeaderTitle>{children}</StyledModalHeaderTitle>
      </StyledModalHeader>
   );
}
