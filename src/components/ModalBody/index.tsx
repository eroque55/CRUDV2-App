import { ModalBodyContainer, ModalBodyNotice, ModalBodyTitle } from "./styles";

interface Props {
   children?: React.ReactNode;
   notice?: string;
}

const ModalBody = ({ children, notice }: Props) => {
   return (
      <ModalBodyContainer>
         <ModalBodyTitle>{children}</ModalBodyTitle>
         <ModalBodyNotice>{notice}</ModalBodyNotice>
      </ModalBodyContainer>
   );
};

export default ModalBody;
