import FormModal from "@/src/components/Modal/FormModal";
import { useCreateModalStore } from "@/src/store/ClienteStore";

export default function CreateCustomerModal() {
   const { createIsOpen, createCloseModal } = useCreateModalStore();
   return (
      <FormModal
         actionButton="Salvar"
         closeModal={createCloseModal}
         isOpen={createIsOpen}
         submitModal={() => {}}
         title="Cadastrar cliente"
         fields={[
            {
               children: "Nome",
               placeholder: "Digite o nome",
               required: true,
            },
            {
               children: "Data de nascimento",
               placeholder: "Digite a data de nascimento",
               required: true,
               type: "date",
            },
            {
               children: "Cpf",
               placeholder: "Digite o CPF",
               required: true,
               maxLength: 11,
            },
            {
               children: "Genêro",
               placeholder: "Digite o nome do cliente",
               required: true,
            },
            {
               children: "E-mail",
               placeholder: "Digite o e-mail",
               required: true,
               type: "email",
            },
            {
               children: "Senha",
               placeholder: "Digite a senha",
               required: true,
               type: "password",
            },
            {
               children: "Confirme a senha",
               placeholder: "Confirme a senha",
               required: true,
               type: "password",
            },
            {
               children: "Ranking",
               placeholder: "Defina o ranking",
               required: true,
               type: "number",
            },
            {
               children: "DDD",
               placeholder: "Digite o DDD",
               required: true,
               type: "text",
               maxLength: 3,
            },
            {
               children: "Número do telefone",
               placeholder: "Digite o número do telefone",
               required: true,
               type: "text",
               maxLength: 9,
            },
            {
               children: "Tipo de telefone",
               placeholder: "Digite o nome do cliente",
               required: true,
               type: "text",
            },
         ]}
      />
   );
}
