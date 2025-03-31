import Card from "../Card";
import { capitalizeFirstLetter, formatCpf, formatPhone } from "@/src/utils";
import { CardContentProps } from "../CardContentContainer";
import { useCustomerDetailsStore } from "@/src/store/CustomerDetailsStore";
import { CardButtonProps } from "../CardButton";

interface Props {
   setUpdateIsOpen: (value: boolean) => void;
}

const CardPersonalData = ({ setUpdateIsOpen }: Props) => {
   const { customer } = useCustomerDetailsStore();

   const birthDate = new Date(customer?.birthDate || "").toLocaleDateString(
      "pt-BR"
   );

   const phone = (customer?.phone.ddd || "") + (customer?.phone.number || "");

   const cardContent: CardContentProps[] = [
      {
         title: "Nome",
         children: customer?.name,
      },
      {
         title: "Data de nascimento",
         children: birthDate,
      },
      {
         title: "CPF",
         children: formatCpf(customer?.cpf || ""),
      },
      {
         title: "Gênero",
         children: capitalizeFirstLetter(customer?.gender || ""),
      },
      {
         title: "E-mail",
         children: customer?.email,
      },
      {
         title: "Ranking",
         children: customer?.ranking,
      },
      {
         title: "Status",
         children: customer?.status ? "Ativo" : "Inativo",
      },
      {
         title: "Tipo de telefone",
         children: capitalizeFirstLetter(customer?.phone.phoneType || ""),
      },
      {
         title: "Telefone",
         children: formatPhone(phone),
      },
   ];

   const updateButton: CardButtonProps = {
      icon: "EditIcon",
      onClick: () => setUpdateIsOpen(true),
   };

   return <Card cardContent={cardContent} cardButtons={[updateButton]} />;
};

export default CardPersonalData;
