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
import { createPhone } from "@/src/services/PhoneService";
import { createAddress } from "@/src/services/AddressService";
import ICustomer from "@/src/@types/ICustomer";
import IPhone from "@/src/@types/IPhone";
import IAddress from "@/src/@types/IAddress";
import Modal from "@/src/components/commom/Modal/AttentionModal";

export default function CreateCustomerFlow() {
   const { createIsOpen, createCloseModal, modalBack, modalNext, modalNumber } =
      useCreateModalStore();

   const { fetchCustomers } = useCustomerStore();

   const [personalData, setPersonalData] = useState<ICustomer>({
      id: 0,
      name: "",
      birthDate: new Date(),
      cpf: "",
      confPassword: "",
      email: "",
      gender: "OUTRO",
      password: "",
      ranking: 0,
      status: true,
   });

   const [phoneData, setPhoneData] = useState<IPhone>({
      id: 0,
      customerId: 0,
      ddd: "",
      number: "",
      phoneType: "OUTRO",
   });

   const [billingAddressData, setBillingAddressData] = useState<IAddress>({
      id: 0,
      customerId: 0,
      nickname: "",
      street: "",
      number: 0,
      neighborhood: "",
      cep: "",
      complement: "",
      city: {
         id: 0,
         name: "",
         state: {
            id: 0,
            name: "",
            country: {
               id: 0,
               name: "",
            },
         },
      },
      addressType: "COBRANCA",
      streetType: "OUTRO",
      residenceType: "OUTRO",
   });

   const [deliveryAddressData, setDeliveryAddressData] = useState<IAddress>({
      id: 0,
      customerId: 0,
      nickname: "",
      street: "",
      number: 0,
      neighborhood: "",
      cep: "",
      complement: "",
      city: {
         id: 0,
         name: "",
         state: {
            id: 0,
            name: "",
            country: {
               id: 0,
               name: "",
            },
         },
      },
      addressType: "ENTREGA",
      streetType: "OUTRO",
      residenceType: "OUTRO",
   });

   const finalSubmit = async () => {
      try {
         const customerResponse = await createCustomer(personalData);
         const customerId = customerResponse.id;

         await createPhone({ ...phoneData, customerId: customerId });
         await createAddress({
            ...billingAddressData,
            customerId: customerId,
         });
         await createAddress({
            ...deliveryAddressData,
            customerId: customerId,
         });

         createCloseModal();
         await fetchCustomers();
      } catch (error: any) {
         console.error("Erro ao criar cliente:", error);
         alert("Erro ao criar cliente");
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
               setPersonalData={setPersonalData}
               setPhoneData={setPhoneData}
               modalBack={modalBack}
               modalNext={modalNext}
            />
         )}
         {modalNumber === 2 && (
            <BillingAddress
               setAddressData={setBillingAddressData}
               onCancel={modalBack}
               onSubmit={modalNext}
            />
         )}
         {modalNumber === 3 && (
            <DeliveryAddress
               setAddressData={setDeliveryAddressData}
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
