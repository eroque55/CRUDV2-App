import {
   useCreateCard,
   useCustomerState,
} from "@/src/store/CustomerDetailsStore";
import { createCard } from "@/src/services/CardService";

import {
   StyledDialog,
   StyledOverlay,
} from "@/src/components/admin/common/modal/modal.styles";
import ModalHeader from "@/src/components/admin/common/modal/modalHeader";
import ModalFooter from "@/src/components/admin/common/modal/modalFooter";
import CardForm from "./form";
import { ICardSchema, cardSchema } from "@/src/validations/cardSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { SuccesToast } from "@/src/components/common/toastify/succesToast";
import { Card, Customer } from "@/src/@types/api";
import { CardBrand } from "@/src/@types/enums";

export default function CreateCard() {
   const { isOpen, closeModal, customerId } = useCreateCard();
   const { getCustomer } = useCustomerState();

   const {
      register,
      handleSubmit,
      setValue,
      reset,
      formState: { errors },
   } = useForm<ICardSchema>({
      resolver: yupResolver(cardSchema),
      mode: "onBlur",
   });

   const onSubmit = async (data: ICardSchema) => {
      try {
         const customer: Partial<Customer> = {
            id: customerId,
         };

         const card: Partial<Card> = {
            customer: customer as Customer,
            number: data.number,
            cardholder: data.cardholder,
            cvv: data.cvv,
            expirationDate: data.expirationDate,
            cardBrand: data.cardBrand as CardBrand,
            preferential: false,
         };

         await createCard(card as Card);
         reset();
         closeModal();
         await getCustomer(customerId);
         toast(SuccesToast, {
            data: {
               title: "Cartão cadastrado",
               message: "Cartão cadastrado com sucesso!",
            },
            autoClose: false,
            position: "top-center",
            closeButton: false,
            hideProgressBar: true,
         });
      } catch (error: any) {
         toast.error(`${error.response.data}`);
      }
   };

   if (!isOpen) return null;

   return (
      <StyledOverlay>
         <StyledDialog>
            <ModalHeader>Cadastrar cartão</ModalHeader>
            <CardForm register={register} setValue={setValue} errors={errors} />
            <ModalFooter
               onCancel={closeModal}
               onSubmit={handleSubmit(onSubmit)}
            >
               Cadastrar
            </ModalFooter>
         </StyledDialog>
      </StyledOverlay>
   );
}
