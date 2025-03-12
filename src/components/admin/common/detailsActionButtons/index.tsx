import { ButtonsContainer } from "./index.styles";
import ActionButtons from "./actionButton";

interface Props {
   handleDelete: () => void;
   handleEdit: () => void;
}

export default function DetailsActionButtons({
   handleDelete,
   handleEdit,
}: Props) {
   return (
      <ButtonsContainer>
         <ActionButtons
            onClick={handleDelete}
            src="/icons/delete-button.svg"
            alt="Botão de excluir"
         />
         <ActionButtons
            onClick={handleEdit}
            src="/icons/edit-button.svg"
            alt="Botão de editar"
         />
      </ButtonsContainer>
   );
}
