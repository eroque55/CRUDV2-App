import { ModalContainer } from "../Modal/styles";
import ModalForm from "../ModalForm";
import ModalFooter from "../ModalFooter";
import ModalHeader from "../ModalHeader";
import { set, useForm } from "react-hook-form";
import {
   confirmationModal,
   errorModal,
   IConfirmationToast,
   successModal,
} from "@/src/utils/Toasts";
import ICountry from "@/src/interfaces/ICountry";
import IState from "@/src/interfaces/IState";
import ICity from "@/src/interfaces/ICity";
import IAddress from "@/src/interfaces/IAddress";
import { createAddress } from "@/src/services/Address.service";
import InputField from "../InputField";
import { useEffect, useState } from "react";
import { getCountries } from "@/src/services/Country.service";
import { useCustomerState } from "@/src/store/CustomerDetailsStore";
import ICustomer from "@/src/interfaces/ICustomer";
import ModalBackground from "../ModalBackground";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateAddress } from "@/src/store/AddressUpdateStore";
import {
   AddressUpdateSchema,
   IAddressUpdateSchema,
} from "@/src/validations/AddressUpdateSchema";
import { useCountries } from "@/src/store/CountryStore";

const ModalAddressUpdate = () => {
   const { address, closeModal, isOpen } = useUpdateAddress();
   const { cities, countries, states, getCitiesByState, getStatesByCountry } =
      useCountries();
   const { customer, getCustomer } = useCustomerState();

   const {
      register,
      handleSubmit,
      setValue,
      reset,
      formState: { errors },
   } = useForm<IAddressUpdateSchema>({
      resolver: yupResolver(AddressUpdateSchema),
      mode: "onBlur",
   });

   useEffect(() => {
      (async () => {
         setValue("countryId", String(address?.city.state.country.id));
         await getStatesByCountry(address?.city.state.country.id);
         setValue("stateId", String(address?.city.state.id));

         await getCitiesByState(address?.city.state.id);
         setValue("cityId", String(address?.city.id));
      })();
   }, [isOpen]);

   const confModal: IConfirmationToast = {
      title: "Cancelar alterações?",
      message: "Deseja realmente cancelar as alterações?",
      confirmButton: "Cancelar",
      cancelButton: "Voltar",
      confirmAction: () => {
         closeModal();
         reset();
      },
   };

   const onCancel = () => {
      confirmationModal(confModal);
   };

   const onSubmit = async (data: IAddressUpdateSchema) => {
      console.log(data);
      // try {
      //    const country: Partial<ICountry> = {
      //       id: Number(data.countryId),
      //    };

      //    const state: Partial<IState> = {
      //       id: Number(data.stateId),
      //       country: country as ICountry,
      //    };

      //    const city: Partial<ICity> = {
      //       id: Number(data.cityId),
      //       state: state as IState,
      //    };

      //    const address: Partial<IAddress> = {
      //       customer: customer as ICustomer,
      //       nickname: data.nickname,
      //       cep: data.cep,
      //       street: data.street,
      //       number: data.number,
      //       complement: data.complement,
      //       neighborhood: data.neighborhood,
      //       city: city as ICity,
      //       residenceType: data.residenceType as
      //          | "CASA"
      //          | "APARTAMENTO"
      //          | "OUTRO",
      //       streetType: data.streetType as
      //          | "RUA"
      //          | "AVENIDA"
      //          | "TRAVESSA"
      //          | "ALAMEDA"
      //          | "ESTRADA"
      //          | "OUTRO",
      //    };
      //    await createAddress(address as IAddress);
      //    reset();
      //    closeModal();
      //    await getCustomer(customer?.id || 0);
      //    successModal("Endereço alterado com sucesso!");
      // } catch (error: any) {
      //    errorModal(error.response.data);
      // }
   };

   if (!isOpen) return null;

   return (
      <ModalBackground>
         <ModalContainer $width="40rem">
            <ModalHeader>Alterar endereço</ModalHeader>
            <ModalForm>
               <InputField
                  id="nickname"
                  label="Apelido"
                  register={register}
                  placeholder="Insira um apelido"
                  error={errors.nickname?.message}
                  defaultValue={address?.nickname}
               />
               <InputField
                  id="cep"
                  label="CEP"
                  mask="00000-000"
                  placeholder="Insira o CEP"
                  register={register}
                  type="maskedInput"
                  onAccept={(value) => {
                     setValue("cep", value.replace(/[-]/g, ""));
                  }}
                  error={errors.cep?.message}
                  defaultValue={address?.cep}
               />
               <InputField
                  id="residenceType"
                  label="Tipo de residência"
                  type="select"
                  error={errors.residenceType?.message}
                  selectOptions={[
                     { value: "CASA", label: "Casa" },
                     { value: "APARTAMENTO", label: "Apartamento" },
                     { value: "OUTRO", label: "Outro" },
                  ]}
                  register={register}
                  defaultValue={address?.residenceType}
               />
               <InputField
                  id="streetType"
                  label="Tipo de logradouro"
                  type="select"
                  error={errors.streetType?.message}
                  selectOptions={[
                     { value: "RUA", label: "Rua" },
                     { value: "AVENIDA", label: "Avenida" },
                     { value: "TRAVESSA", label: "Travessa" },
                     { value: "ALAMEDA", label: "Alameda" },
                     { value: "ESTRADA", label: "Estrada" },
                     { value: "OUTRO", label: "Outro" },
                  ]}
                  register={register}
                  defaultValue={address?.streetType}
               />
               <InputField
                  id="street"
                  label="Logradouro"
                  register={register}
                  placeholder="Insira o logradouro"
                  error={errors.street?.message}
                  defaultValue={address?.street}
               />
               <InputField
                  id="number"
                  label="Número"
                  register={register}
                  placeholder="Insira o número"
                  inputType="number"
                  error={errors.number?.message}
                  defaultValue={String(address?.number)}
               />
               <InputField
                  id="neighborhood"
                  label="Bairro"
                  register={register}
                  placeholder="Insira o bairro"
                  error={errors.neighborhood?.message}
                  defaultValue={address?.neighborhood}
               />
               <InputField
                  id="countryId"
                  label="Pais"
                  type="select"
                  error={errors.countryId?.message}
                  selectOptions={countries.map((country) => ({
                     value: country.id.toString(),
                     label: country.name,
                  }))}
                  register={register}
                  onChange={(e) => {
                     getStatesByCountry(Number(e.target.value));
                  }}
                  // defaultValue={String(address?.city.state.country.id)}
               />
               <InputField
                  id="stateId"
                  label="Estado"
                  type="select"
                  error={errors.stateId?.message}
                  selectOptions={states.map((state) => ({
                     value: state.id.toString(),
                     label: state.name,
                  }))}
                  register={register}
                  onChange={(e) => {
                     getCitiesByState(Number(e.target.value));
                  }}
                  // defaultValue={String(address?.city.state.id)}
               />
               <InputField
                  id="cityId"
                  label="Cidade"
                  type="select"
                  error={errors.cityId?.message}
                  selectOptions={cities.map((city) => ({
                     value: city.id.toString(),
                     label: city.name,
                  }))}
                  register={register}
                  // defaultValue={String(address?.city.id)}
               />
               <InputField
                  id="complement"
                  label="Complemento (opcional)"
                  register={register}
                  placeholder="Insira o complemento"
                  error={errors.complement?.message}
                  defaultValue={address?.complement}
               />
            </ModalForm>
            <ModalFooter
               confirmButtonType="submit"
               cancelButton="Cancelar"
               confirmAction={handleSubmit(onSubmit)}
               cancelAction={onCancel}
            >
               Cadastrar
            </ModalFooter>
         </ModalContainer>
      </ModalBackground>
   );
};

export default ModalAddressUpdate;
