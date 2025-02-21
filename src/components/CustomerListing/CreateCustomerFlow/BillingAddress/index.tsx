import { StyledDialog } from "@/src/components/Commom/Modal/modal.styles";
import ModalHeader from "@/src/components/Commom/Modal/ModalHeader";
import ModalFooter from "@/src/components/Commom/Modal/ModalFooter";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "../AddressForm";
import { IAddressSchema, addressSchema } from "@/src/validations/addressSchema";
import { Dispatch, SetStateAction } from "react";

import { Customer, Address, City, State, Country } from "@/src/@types/api";
import { AddressType, ResidenceType, StreetType } from "@/src/@types/enums";
import { toast } from "react-toastify";

interface Props {
   setCustomer: Dispatch<SetStateAction<Partial<Customer>>>;
   onCancel: () => void;
   onSubmit: () => void;
}

export default function BillingAddress({
   setCustomer,
   onCancel,
   onSubmit,
}: Props) {
   const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
   } = useForm<IAddressSchema>({
      resolver: yupResolver(addressSchema),
      mode: "onBlur",
   });

   const submit: SubmitHandler<IAddressSchema> = async (data) => {
      try {
         const country: Partial<Country> = {
            id: data.countryId,
         };

         const state: Partial<State> = {
            id: data.stateId,
            country: country as Country,
         };

         const city: Partial<City> = {
            id: data.cityId,
            state: state as State,
         };

         const address: Partial<Address> = {
            nickname: data.nickname,
            street: data.street,
            number: data.number,
            neighborhood: data.neighborhood,
            cep: data.cep,
            city: city as City,
            complement: data.complement,
            addressType: "ENTREGA" as AddressType,
            residenceType: data.residenceType as ResidenceType,
            streetType: data.streetType as StreetType,
         };

         setCustomer((prevCustomer) => ({
            ...prevCustomer,
            addresses: [...(prevCustomer.addresses || []), address as Address],
         }));

         onSubmit();
      } catch (error: any) {
         toast.error(error.response.data);
      }
   };

   return (
      <StyledDialog>
         <ModalHeader>Cadastrar Cliente 2/3 - Endereço de cobrança</ModalHeader>
         <Form setValue={setValue} register={register} errors={errors} />
         <ModalFooter onCancel={onCancel} onSubmit={handleSubmit(submit)}>
            Próximo
         </ModalFooter>
      </StyledDialog>
   );
}
