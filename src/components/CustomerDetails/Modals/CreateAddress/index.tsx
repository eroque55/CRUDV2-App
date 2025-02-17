import { createAddress } from "@/src/services/AddressService";
import {
   useCreateAddress,
   useCustomerState,
} from "@/src/store/CustomerDetailsStore";

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
import { toast } from "react-toastify";
import { SuccesToast } from "@/src/components/commom/Toastify/SuccesToast";

import { Address } from "@/src/@types/api";
import {
   AddressType,
   Gender,
   ResidenceType,
   StreetType,
} from "@/src/@types/enums";

export default function CreateAddress() {
   const { isOpen, closeModal, customerId } = useCreateAddress();
   const { getCustomer } = useCustomerState();

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
      const address: Address = {
         id: 0,
         customer: {
            id: customerId,
            name: "",
            birthDate: new Date(),
            cpf: "",
            gender: "OUTRO" as Gender,
            email: "",
            password: "",
            confPassword: "",
            status: true,
            ranking: 0,
         },
         nickname: data.nickname,
         cep: data.cep,
         street: data.street,
         number: data.number,
         complement: data.complement,
         neighborhood: data.neighborhood,
         city: {
            id: data.cityId,
            name: "",
            state: {
               id: data.stateId,
               name: "",
               country: { id: data.countryId, name: "" },
            },
         },
         addressType: data.addressType as AddressType,
         residenceType: data.residenceType as ResidenceType,
         streetType: data.streetType as StreetType,
      };
      await createAddress(address);
      reset();
      closeModal();
      await getCustomer(customerId);
      toast(SuccesToast, {
         data: {
            title: "Sucesso!",
            message: "Endereço cadastrado com sucesso!",
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
