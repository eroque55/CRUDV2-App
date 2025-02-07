import FormModal from "@/src/components/Modal/FormModal";
import { useCreateModalStore } from "@/src/store/ClienteStore";
import { useForm } from "react-hook-form";

export default function CreateCustomerModal() {
   const { createIsOpen, createCloseModal } = useCreateModalStore();
   const { register, handleSubmit } = useForm();

   const onSubmit = (data: any) => {
      console.log(data);
   };

   return (
      <FormModal
         actionButton="Salvar"
         onCancel={createCloseModal}
         isOpen={createIsOpen}
         onSubmit={handleSubmit(onSubmit)}
         title="Cadastrar cliente"
         register={register}
         fields={[
            {
               registerName: "nome",
               children: "Nome",
               placeholder: "Digite o nome",
               required: true,
            },
            {
               registerName: "dataNascimento",
               children: "Data de nascimento",
               placeholder: "Digite a data de nascimento",
               required: true,
               type: "date",
            },
            {
               registerName: "cpf",
               children: "Cpf",
               placeholder: "Digite o CPF",
               required: true,
               maxLength: 11,
            },
            {
               registerName: "genero",
               children: "Genêro",
               placeholder: "Digite o nome do cliente",
               required: true,
            },
            {
               registerName: "email",
               children: "E-mail",
               placeholder: "Digite o e-mail",
               required: true,
               type: "email",
            },
            {
               registerName: "senha",
               children: "Senha",
               placeholder: "Digite a senha",
               required: true,
               type: "password",
            },
            {
               registerName: "confirmaSenha",
               children: "Confirme a senha",
               placeholder: "Confirme a senha",
               required: true,
               type: "password",
            },
            {
               registerName: "ranking",
               children: "Ranking",
               placeholder: "Defina o ranking",
               required: true,
               type: "number",
            },
            {
               registerName: "ddd",
               children: "DDD",
               placeholder: "Digite o DDD",
               required: true,
               type: "text",
               maxLength: 3,
            },
            {
               registerName: "numeroTelefone",
               children: "Número do telefone",
               placeholder: "Digite o número do telefone",
               required: true,
               type: "text",
               maxLength: 9,
            },
            {
               registerName: "tipoTelefone",
               children: "Tipo de telefone",
               placeholder: "Digite o nome do cliente",
               required: true,
               type: "text",
            },
         ]}
      />
   );
}
