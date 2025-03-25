import { ModalFormContainer } from "./styles";

interface Props {
   children?: React.ReactNode;
}

const ModalForm = ({ children }: Props) => {
   return <ModalFormContainer>{children}</ModalFormContainer>;
};

export default ModalForm;
