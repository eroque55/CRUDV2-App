import ICustomer from "@/src/@types/ICustomer";
import InfoContainer from "../../common/InfoContainer";
import { StyledCard } from "../../common/StyledCard/index.styles";
import { capitalizeFirstLetter } from "@/src/util";

interface Props {
   customer: ICustomer | null;
}

export default function PersonalDataCard({ customer }: Props) {
   if (!customer) return null;
   const birthDate = new Date(customer._birthDate).toLocaleDateString("pt-BR");
   const cpf = customer._cpf
      .trim()
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

   const gender = capitalizeFirstLetter(customer._gender);

   return (
      <StyledCard>
         <InfoContainer title="Nome">{customer._name}</InfoContainer>
         <InfoContainer title="Data de nascimento">{birthDate}</InfoContainer>
         <InfoContainer title="CPF">{cpf}</InfoContainer>
         <InfoContainer title="Gênero">{gender}</InfoContainer>
         <InfoContainer title="E-mail">{customer._email}</InfoContainer>
         <InfoContainer title="Ranking">{customer._ranking}</InfoContainer>
         <InfoContainer title="Status">
            {customer._status ? "Ativo" : "Inativo"}
         </InfoContainer>
      </StyledCard>
   );
}
