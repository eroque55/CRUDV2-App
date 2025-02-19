import { StyledOverlay } from "@/src/components/commom/Modal/modal.styles";
import {
   useCustomerStore,
   useCreateModalStore,
} from "@/src/store/CustomerListingStore";

import PersonalData from "./PersonalData";
import BillingAddress from "./BillingAddress";
import DeliveryAddress from "./DeliveryAddress";
import { useState } from "react";
import { createCustomer } from "@/src/services/CustomerService";
import { Customer } from "@/src/@types/api";
import { Gender } from "@/src/@types/enums";
import Modal from "@/src/components/commom/Modal/AttentionModal";

export default function CreateCustomerFlow() {
   const { createIsOpen, createCloseModal, modalBack, modalNext, modalNumber } =
      useCreateModalStore();

   const { fetchCustomers } = useCustomerStore();

   const [customer, setCustomer] = useState<Customer>({
      id: 0,
      name: "",
      birthDate: new Date(),
      cpf: "",
      gender: "OUTRO" as Gender,
      email: "",
      password: "",
      confPassword: "",
      status: true,
      ranking: 0,
   });

   const finalSubmit = async () => {
      try {
         await createCustomer(customer);
         createCloseModal();
         modalNumber === 1;
         await fetchCustomers();
      } catch (error: any) {
         alert("Erro ao criar cliente: " + error.message);
      }
   };

   const cancelModal = () => {
      createCloseModal();
      modalNext();
   };

   if (!createIsOpen) return null;

   return (
      <StyledOverlay>
         {modalNumber === 0 && (
            <Modal
               isOpen={true}
               title="Tem certeza?"
               actionButton="Descartar"
               closeModal={modalNext}
               submitModal={cancelModal}
               color="red"
            >
               Tem certeza que deseja descartar as alterações?
            </Modal>
         )}
         {modalNumber === 1 && (
            <PersonalData
               setCustomer={setCustomer}
               modalBack={modalBack}
               modalNext={modalNext}
            />
         )}
         {modalNumber === 2 && (
            <BillingAddress
               setCustomer={setCustomer}
               onCancel={modalBack}
               onSubmit={modalNext}
            />
         )}
         {modalNumber === 3 && (
            <DeliveryAddress
               setCustomer={setCustomer}
               onCancel={modalBack}
               onSubmit={modalNext}
            />
         )}
         {modalNumber === 4 && (
            <Modal
               isOpen={true}
               title="Sucesso!"
               actionButton="Cadastrar"
               submitModal={finalSubmit}
               uniqueButton
               color="green"
            >
               Cliente cadastrado com sucesso!
            </Modal>
         )}
      </StyledOverlay>
   );
}
