import { StyledModalHeader, StyledModalHeaderTitle } from "./index.styles";

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
