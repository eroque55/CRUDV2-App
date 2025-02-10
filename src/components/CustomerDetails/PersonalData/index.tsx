import ICustomer from "@/src/@types/ICustomer";
import InfoContainer from "../Common/InfoContainer";
import { StyledContainer } from "../Common/InfoContainer/index.styles";
import { StyledPage } from "@/src/app/customer/[id]/page.styles";

interface Props {
   customer: ICustomer;
}

export default function PersonalData({ customer }: Props) {
   const birthDate = new Date(customer._birthDate).toLocaleDateString("pt-BR");
   const cpf = customer._cpf
      .trim()
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

   const capitalizeFirstLetter = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

   const gender = capitalizeFirstLetter(customer._gender);

   return (
      <StyledPage>
         <StyledContainer>
            <InfoContainer title="Nome">{customer._name}</InfoContainer>
            <InfoContainer title="Data de nascimento">
               {birthDate}
            </InfoContainer>
            <InfoContainer title="CPF">{cpf}</InfoContainer>
            <InfoContainer title="Gênero">{gender}</InfoContainer>
            <InfoContainer title="E-mail">{customer._email}</InfoContainer>
            <InfoContainer title="Ranking">{customer._ranking}</InfoContainer>
            <InfoContainer title="Status">
               {customer._status ? "Ativo" : "Inativo"}
            </InfoContainer>
         </StyledContainer>
      </StyledPage>
   );
}
