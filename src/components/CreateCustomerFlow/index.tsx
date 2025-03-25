import {
   useCustomerStore,
   useCreateModalStore,
} from "@/src/store/CustomerListingStore";

import PersonalData from "./personalData";
import BillingAddress from "./billingAddress";
import DeliveryAddress from "./deliveryAddress";
import { useEffect, useState } from "react";
import { createCustomer } from "@/src/services/Customer.service";
import ICustomer from "@/src/interfaces/ICustomer";
import { toast } from "react-toastify";
import { SuccesToast } from "../SuccesToast";
import { ConfirmationToast } from "../ConfirmationToast";
import ModalBackground from "../ModalBackground";

export default function CreateCustomerFlow() {
   const {
      createIsOpen,
      createCloseModal,
      modalBack,
      modalNext,
      modalNumber,
      modalReset,
   } = useCreateModalStore();
   const { fetchCustomers } = useCustomerStore();
   const [customer, setCustomer] = useState<Partial<ICustomer>>({});
   const [isSubmitting, setIsSubmitting] = useState(false);

   const finalSubmit = async () => {
      try {
         setIsSubmitting(true);
         await createCustomer(customer as ICustomer);
         createCloseModal();
         modalReset();
         await fetchCustomers();
         toast(SuccesToast, {
            data: {
               title: "Sucesso!",
               message: "Cliente cadastrado com sucesso!",
            },
            autoClose: false,
            position: "top-center",
            closeButton: false,
            hideProgressBar: true,
         });
      } catch (error: any) {
         toast.error(error.response.data);
      } finally {
         setIsSubmitting(false);
      }
   };

   useEffect(() => {
      if (isSubmitting) {
         finalSubmit();
      }
   }, [customer]);

   const handleFinalSubmit = () => {
      setIsSubmitting(true);
   };

   if (!createIsOpen) return null;

   return (
      <ModalBackground>
         {modalNumber === 0 && (
            <PersonalData
               setCustomer={setCustomer}
               modalBack={() => {
                  toast(ConfirmationToast, {
                     data: {
                        title: "Tem certeza?",
                        notConfirmation: true,
                        message: "Tem certeza que deseja descartar o cadastro?",
                        successMessage: "",
                        actionButton: "Descartar",
                        onSubmit: createCloseModal,
                     },
                     autoClose: false,
                     position: "top-center",
                     closeButton: false,
                     hideProgressBar: true,
                  });
               }}
               modalNext={modalNext}
            />
         )}
         {modalNumber === 1 && (
            <BillingAddress
               setCustomer={setCustomer}
               onCancel={modalBack}
               onSubmit={modalNext}
            />
         )}
         {modalNumber === 2 && (
            <DeliveryAddress
               setCustomer={setCustomer}
               onCancel={modalBack}
               onSubmit={handleFinalSubmit}
            />
         )}
      </ModalBackground>
   );
}
