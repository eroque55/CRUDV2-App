import ICustomer from "@/src/@types/ICustomer";
import InfoContainer from "../Common/InfoContainer";
import { StyledContainer } from "../Common/InfoContainer/index.styles";
import { StyledPage } from "@/src/app/customer/[id]/page.styles";
import { capitalizeFirstLetter } from "@/src/app/util";
import IPhone from "@/src/@types/IPhone";

interface Props {
   customer: ICustomer;
   phone: IPhone;
}

export default function PersonalData({ customer, phone }: Props) {
   const birthDate = new Date(customer._birthDate).toLocaleDateString("pt-BR");
   const cpf = customer._cpf
      .trim()
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

   const gender = capitalizeFirstLetter(customer._gender);

   const phoneFormatted = `(${phone._ddd}) ${phone._number.substring(
      0,
      5
   )}-${phone._number.substring(5)}`;

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
         <StyledContainer>
            <InfoContainer title="Telefone">{phoneFormatted}</InfoContainer>
            <InfoContainer title="Telefone">
               {capitalizeFirstLetter(phone._phoneType)}
            </InfoContainer>
         </StyledContainer>
      </StyledPage>
   );
}
