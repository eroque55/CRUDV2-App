import { StyledOverlay } from "@/src/components/Modal/modal.styles";
import { useClienteStore, useCreateModalStore } from "@/src/store/ClienteStore";

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
import Modal from "@/src/components/Modal/AttentionModal";

export default function CreateCustomerFlow() {
   const { createIsOpen, createCloseModal, modalBack, modalNext, modalNumber } =
      useCreateModalStore();

   const { carregarClientes } = useClienteStore();

   const [personalData, setPersonalData] = useState<ICustomer>({
      _id: 0,
      _name: "",
      _birthDate: new Date(),
      _cpf: "",
      _confPassword: "",
      _email: "",
      _gender: "OUTRO",
      _password: "",
      _ranking: 0,
      _status: true,
   });

   const [phoneData, setPhoneData] = useState<IPhone>({
      _id: 0,
      _customerId: 0,
      _ddd: "",
      _number: "",
      _phoneType: "OUTRO",
   });

   const [billingAddressData, setBillingAddressData] = useState<IAddress>({
      _id: 0,
      _customerId: 0,
      _nickname: "",
      _street: "",
      _number: 0,
      _neighborhood: "",
      _cep: "",
      _complement: "",
      _cityId: 0,
      _addressType: "COBRANCA",
      _streetType: "OUTRO",
      _residenceType: "OUTRO",
   });

   const [deliveryAddressData, setDeliveryAddressData] = useState<IAddress>({
      _id: 0,
      _customerId: 0,
      _nickname: "",
      _street: "",
      _number: 0,
      _neighborhood: "",
      _cep: "",
      _complement: "",
      _cityId: 0,
      _addressType: "ENTREGA",
      _streetType: "OUTRO",
      _residenceType: "OUTRO",
   });

   const finalSubmit = async () => {
      try {
         const customerResponse = await createCustomer(personalData);

         const customerId = customerResponse._id;

         await createPhone({ ...phoneData, _customerId: customerId });
         await createAddress({
            ...billingAddressData,
            _customerId: customerId,
         });
         await createAddress({
            ...deliveryAddressData,
            _customerId: customerId,
         });

         createCloseModal();
         await carregarClientes();
      } catch (error) {
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
