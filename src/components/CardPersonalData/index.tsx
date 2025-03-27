import Card from "../Card";
import {
   capitalizeFirstLetter,
   formatCep,
   formatCpf,
   formatPhone,
} from "@/src/utils";
import { CardContentProps } from "../CardContentContainer";
import { useUpdateCustomer } from "@/src/store/CustomerDetailsStore";
import { CardButtonProps } from "../CardButton";
import ICustomer from "@/src/interfaces/ICustomer";

interface Props {
   customer: ICustomer;
}

const CardPersonalData = ({ customer }: Props) => {
   const { openModal } = useUpdateCustomer();

   const birthDate = new Date(customer.birthDate).toLocaleDateString("pt-BR");

   const cardContent: CardContentProps[] = [
      {
         title: "Nome",
         children: customer.name,
      },
      {
         title: "Data de nascimento",
         children: birthDate,
      },
      {
         title: "CPF",
         children: formatCpf(customer.cpf),
      },
      {
         title: "Gênero",
         children: capitalizeFirstLetter(customer.gender),
      },
      {
         title: "E-mail",
         children: customer.email,
      },
      {
         title: "Ranking",
         children: customer.ranking,
      },
      {
         title: "Status",
         children: customer.status ? "Ativo" : "Inativo",
      },
      {
         title: "Tipo de telefone",
         children: capitalizeFirstLetter(customer.phone.phoneType),
      },
      {
         title: "Telefone",
         children: formatPhone(customer.phone.ddd + customer.phone.number),
      },
   ];

   const updateButton: CardButtonProps = {
      icon: "EditIcon",
      onClick: openModal,
   };

   return <Card cardContent={cardContent} cardButtons={[updateButton]} />;
};

export default CardPersonalData;
