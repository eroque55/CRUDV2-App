import { useCreateCard } from "@/src/store/CustomerDetailsStore";
import { createCard } from "@/src/services/CardService";

import {
   StyledDialog,
   StyledOverlay,
} from "@/src/components/commom/Modal/modal.styles";
import ModalHeader from "@/src/components/commom/Modal/ModalHeader";
import ModalFooter from "@/src/components/commom/Modal/ModalFooter";
import CardForm from "./Form";
import { ICardSchema, cardSchema } from "@/src/validations/cardSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ICard from "@/src/@types/ICard";
import { toast } from "react-toastify";
import { SuccesToast } from "@/src/components/commom/Toastify/ToastContainer";

interface Props {
   fetchData: () => void;
}

export default function CreateCard({ fetchData }: Props) {
   const { isOpen, closeModal, customerId } = useCreateCard();

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
      const cardBrand = data.cardBrand as
         | "VISA"
         | "MASTERCARD"
         | "AMERICAN_EXPRESS"
         | "DISCOVER"
         | "DINERS_CLUB"
         | "JCB"
         | "OUTRA";

      const card: ICard = {
         _id: 0,
         _customerId: customerId,
         _number: data.number,
         _cardholder: data.cardholder,
         _cvv: data.cvv,
         _expirationDate: data.expirationDate,
         _cardBrand: cardBrand,
         _preferential: false,
      };
      await createCard(card);
      reset();
      closeModal();
      await fetchData();
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
