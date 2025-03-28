import { ModalContainer } from "../Modal/styles";
import ModalForm from "../ModalForm";
import ModalFooter from "../ModalFooter";
import ModalHeader from "../ModalHeader";
import { useForm } from "react-hook-form";
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

const ModalAddressUpdate = () => {
   const { closeModal, isOpen } = useUpdateAddress();
   const [countries, setCountries] = useState<ICountry[]>([]);
   const [states, setStates] = useState<IState[]>([]);
   const [cities, setCities] = useState<ICity[]>([]);
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
      const fetchCountries = async () => {
         const fetchedCountries = await getCountries();
         setCountries(fetchedCountries);
      };
      fetchCountries();
   }, [setValue]);

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
      try {
         const country: Partial<ICountry> = {
            id: Number(data.countryId),
         };

         const state: Partial<IState> = {
            id: Number(data.stateId),
            country: country as ICountry,
         };

         const city: Partial<ICity> = {
            id: Number(data.cityId),
            state: state as IState,
         };

         const address: Partial<IAddress> = {
            customer: customer as ICustomer,
            nickname: data.nickname,
            cep: data.cep,
            street: data.street,
            number: data.number,
            complement: data.complement,
            neighborhood: data.neighborhood,
            city: city as ICity,
            residenceType: data.residenceType as
               | "CASA"
               | "APARTAMENTO"
               | "OUTRO",
            streetType: data.streetType as
               | "RUA"
               | "AVENIDA"
               | "TRAVESSA"
               | "ALAMEDA"
               | "ESTRADA"
               | "OUTRO",
         };
         await createAddress(address as IAddress);
         reset();
         closeModal();
         await getCustomer(customer?.id || 0);
         successModal("Endereço alterado com sucesso!");
      } catch (error: any) {
         errorModal(error.response.data);
      }
   };

   const getStatesByCountry = (countryId: number) => {
      const selectedCountry = countries.find(
         (country) => country.id === countryId
      );
      if (selectedCountry) {
         const statesList = selectedCountry.states;
         setStates(statesList);
         setCities([]);
         setValue("stateId", "");
         setValue("cityId", "");

         if (statesList.length > 0) {
            getCitiesByState(statesList[0].id);
         }
      }
   };

   const getCitiesByState = (stateId: number) => {
      const selectedState = states.find((state) => state.id === stateId);
      if (selectedState) {
         const citiesList = selectedState.cities;
         setCities(citiesList);
         setValue("cityId", "");
      }
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
               />
               <InputField
                  id="street"
                  label="Logradouro"
                  register={register}
                  placeholder="Insira o logradouro"
                  error={errors.street?.message}
               />
               <InputField
                  id="number"
                  label="Número"
                  register={register}
                  placeholder="Insira o número"
                  inputType="number"
                  error={errors.number?.message}
               />
               <InputField
                  id="neighborhood"
                  label="Bairro"
                  register={register}
                  placeholder="Insira o bairro"
                  error={errors.neighborhood?.message}
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
               />
               <InputField
                  id="complement"
                  label="Complemento (opcional)"
                  register={register}
                  placeholder="Insira o complemento"
                  error={errors.complement?.message}
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
