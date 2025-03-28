import { StyledDialog } from "@/src/components/Modalzz/modal.styles";
import ModalHeader from "@/src/components/Modalzz/modalHeader";
import ModalFooter from "@/src/components/Modalzz/modalFooter";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "../addressForm";
import {
   IAddressCreateSchema,
   AddressCreateSchema,
} from "@/src/validations/AddressCreateSchema";
import { Dispatch, SetStateAction } from "react";
import { Customer, Address, Country, State, City } from "@/src/interfaces/api";
import { AddressType, ResidenceType, StreetType } from "@/src/interfaces/enums";
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
   } = useForm<IAddressCreateSchema>({
      resolver: yupResolver(AddressCreateSchema),
      mode: "onBlur",
   });

   const submit: SubmitHandler<IAddressCreateSchema> = (data) => {
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
         <ModalHeader>Cadastrar Cliente 3/3 - Endereço de entrega</ModalHeader>
         <Form setValue={setValue} register={register} errors={errors} />
         <ModalFooter onCancel={onCancel} onSubmit={handleSubmit(submit)}>
            Salvar
         </ModalFooter>
      </StyledDialog>
   );
}
