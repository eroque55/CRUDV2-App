import { StyledDialog } from "@/src/components/commom/Modal/modal.styles";
import ModalHeader from "@/src/components/commom/Modal/ModalHeader";
import ModalFooter from "@/src/components/commom/Modal/ModalFooter";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "../AddressForm";
import { IAddressSchema, addressSchema } from "@/src/validations/addressSchema";
import { Dispatch, SetStateAction } from "react";
import { Customer, Address } from "@/src/@types/api";
import { AddressType, ResidenceType, StreetType } from "@/src/@types/enums";

interface Props {
   setCustomer: Dispatch<SetStateAction<Customer>>;
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
         const address: Address = {
            id: 0,
            nickname: data.nickname,
            street: data.street,
            number: data.number,
            neighborhood: data.neighborhood,
            cep: data.cep,
            city: {
               id: data.cityId,
               name: "",
               state: {
                  id: data.stateId,
                  name: "",
                  country: { id: data.countryId, name: "" },
               },
            },
            complement: data.complement,
            addressType: "ENTREGA" as AddressType,
            residenceType: data.residenceType as ResidenceType,
            streetType: data.streetType as StreetType,
         };

         setCustomer((prevCustomer) => ({
            ...prevCustomer,
            addresses: [...(prevCustomer.addresses || []), address],
         }));

         onSubmit();
      } catch (error) {
         console.error("Erro ao salvar endereço:", error);
         alert("Erro ao salvar endereço");
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
