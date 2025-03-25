import InfoContainer from "@/src/components/InfoContainer";
import { StyledCard } from "@/src/components/admin/CustomerDetails/common/StyledCard/index.styles";
import { capitalizeFirstLetter } from "@/src/utils";
import { ButtonsContainer } from "@/src/components/DetailsActionButtons/index.styles";
import { Customer } from "@/src/interfaces/api";
import { useUpdateCustomer } from "@/src/store/CustomerDetailsStore";
import ActionButtons from "@/src/components/DetailsActionButtons/actionButton";

interface Props {
   customer: Customer | null;
}

export default function PersonalDataCard({ customer }: Props) {
   const { openModal } = useUpdateCustomer();

   if (!customer) return null;

   const birthDate = new Date(customer.birthDate).toLocaleDateString("pt-BR");
   const cpf = customer.cpf
      .trim()
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

   const gender = capitalizeFirstLetter(customer.gender);

   return (
      <StyledCard>
         <InfoContainer title="Nome">{customer.name}</InfoContainer>
         <ButtonsContainer>
            <ActionButtons
               onClick={openModal}
               src="/icons/edit-button.svg"
               alt="Botão de editar"
            />
         </ButtonsContainer>
         <InfoContainer title="Data de nascimento">{birthDate}</InfoContainer>
         <InfoContainer title="CPF">{cpf}</InfoContainer>
         <InfoContainer title="Gênero">{gender}</InfoContainer>
         <InfoContainer title="E-mail">{customer.email}</InfoContainer>
         <InfoContainer title="Ranking">{customer.ranking}</InfoContainer>
         <InfoContainer title="Status">
            {customer.status ? "Ativo" : "Inativo"}
         </InfoContainer>
      </StyledCard>
   );
}
