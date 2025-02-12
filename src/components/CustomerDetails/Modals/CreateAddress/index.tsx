import { createAddress } from "@/src/services/AddressService";
import { useCreateAddress } from "@/src/store/CustomerDetailsStore";

import {
   StyledDialog,
   StyledOverlay,
} from "@/src/components/commom/Modal/modal.styles";
import ModalHeader from "@/src/components/commom/Modal/ModalHeader";
import ModalFooter from "@/src/components/commom/Modal/ModalFooter";
import CardForm from "./Form";
import { IAddressSchema, addressSchema } from "@/src/validations/addressSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import IAddress from "@/src/@types/IAddress";

interface Props {
   fetchData: () => void;
}

export default function CreateAddress({ fetchData }: Props) {
   const { isOpen, closeModal, customerId } = useCreateAddress();

   const {
      register,
      handleSubmit,
      setValue,
      reset,
      formState: { errors },
   } = useForm<IAddressSchema>({
      resolver: yupResolver(addressSchema),
      mode: "onBlur",
   });

   const onSubmit = async (data: IAddressSchema) => {
      const addressType = data.addressType as
         | "RESIDENCIAL"
         | "COBRANCA"
         | "ENTREGA";

      const residenceType = data.residenceType as
         | "CASA"
         | "APARTAMENTO"
         | "OUTRO";

      const streetType = data.streetType as
         | "RUA"
         | "AVENIDA"
         | "TRAVESSA"
         | "ALAMEDA"
         | "ESTRADA"
         | "OUTRO";

      const address: IAddress = {
         _id: 0,
         _customerId: customerId,
         _nickname: data.nickname,
         _cep: data.cep,
         _street: data.street,
         _number: data.number,
         _complement: data.complement,
         _neighborhood: data.neighborhood,
         _cityId: data.cityId,
         _addressType: addressType,
         _residenceType: residenceType,
         _streetType: streetType,
      };
      createAddress(address);
      reset();
      closeModal();
      fetchData();
   };

   if (!isOpen) return null;

   return (
      <StyledOverlay>
         <StyledDialog>
            <ModalHeader>Cadastrar endereço</ModalHeader>
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
