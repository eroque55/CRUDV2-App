import { ButtonsContainer } from "./index.styles";
import ActionButtons from "./ActionButton";

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
            src="/icons/DeleteButton.svg"
            alt="Botão de excluir"
         />
         <ActionButtons
            onClick={handleEdit}
            src="/icons/EditButton.svg"
            alt="Botão de editar"
         />
      </ButtonsContainer>
   );
}
