import {
   StyledModalBody,
   StyledModalBodyText,
   StyledModalBodyTitle,
} from "./index.styles";

interface Props {
   children: React.ReactNode;
   notice?: string;
}

export default function ModalBody({ children, notice }: Props) {
   return (
      <StyledModalBody>
         <StyledModalBodyTitle>{children}</StyledModalBodyTitle>
         <StyledModalBodyText>{notice}</StyledModalBodyText>
      </StyledModalBody>
   );
}
