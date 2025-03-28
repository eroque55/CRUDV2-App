import { ModalBackground, ModalContainer } from "../Modal/styles";
import ModalForm from "../ModalForm";
import ModalFooter from "../ModalFooter";
import ModalHeader from "../ModalHeader";
import { useForm } from "react-hook-form";
import {
   confirmationModal,
   IConfirmationToast,
   successModal,
} from "@/src/utils/Toasts";
import { IAddressSchema } from "@/src/validations/addressSchema";
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

interface Props {
   isOpen: boolean;
   setIsOpen: (value: boolean) => void;
}

const ModalAddressCreate = ({ isOpen, setIsOpen }: Props) => {
   const [countries, setCountries] = useState<ICountry[]>([]);
   const [states, setStates] = useState<IState[]>([]);
   const [cities, setCities] = useState<ICity[]>([]);
   const { customer, getCustomer } = useCustomerState();

   const {
      register,
      handleSubmit,
      reset,
      setValue,
      formState: { errors },
   } = useForm<IAddressSchema>({ mode: "onBlur" });

   useEffect(() => {
      const fetchCountries = async () => {
         const fetchedCountries = await getCountries();
         setCountries(fetchedCountries);

         if (fetchedCountries.length > 0) {
            const firstCountry = fetchedCountries[0];
            setValue("countryId", firstCountry.id);
            setStates(firstCountry.states);

            if (firstCountry.states.length > 0) {
               const firstState = firstCountry.states[0];
               setValue("stateId", firstState.id);
               setCities(firstState.cities);

               if (firstState.cities.length > 0) {
                  const firstCity = firstState.cities[0];
                  setValue("cityId", firstCity.id);
               }
            }
         }
      };
      fetchCountries();
   }, [setValue]);

   const confModal: IConfirmationToast = {
      title: "Cancelar Cadastro",
      message: "Deseja realmente cancelar o cadastro?",
      confirmButton: "Cancelar",
      cancelButton: "Voltar",
      confirmAction: () => {
         setIsOpen(false);
         reset();
      },
   };

   const onCancel = () => {
      confirmationModal(confModal);
   };

   const onSubmit = async (data: IAddressSchema) => {
      const country: Partial<ICountry> = {
         id: data.countryId,
      };

      const state: Partial<IState> = {
         id: data.stateId,
         country: country as ICountry,
      };

      const city: Partial<ICity> = {
         id: data.cityId,
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
         addressType: data.addressType as
            | "RESIDENCIAL"
            | "COBRANCA"
            | "ENTREGA",
         residenceType: data.residenceType as "CASA" | "APARTAMENTO" | "OUTRO",
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
      setIsOpen(false);
      await getCustomer(customer?.id || 0);
      successModal("Endereço cadastrado com sucesso!");
   };

   const getStatesByCountry = (countryId: number) => {
      const selectedCountry = countries.find(
         (country) => country.id === countryId
      );
      if (selectedCountry) {
         const statesList = selectedCountry.states;
         setStates(statesList);
         setCities([]);
         setValue("stateId", statesList.length ? statesList[0].id : 0);
         setValue("cityId", 0);

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
         setValue("cityId", citiesList.length ? citiesList[0].id : 0);
      }
   };

   if (!isOpen) return null;

   return (
      <ModalBackground>
         <ModalContainer $width="35rem">
            <ModalHeader>Cadastrar contato</ModalHeader>
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
                  id="addressType"
                  label="Tipo de endereço"
                  type="select"
                  error={errors.addressType?.message}
                  selectOptions={[
                     { value: "RESIDENCIAL", label: "Residencial" },
                     { value: "COBRANCA", label: "Cobrança" },
                     { value: "ENTREGA", label: "Entrega" },
                  ]}
                  register={register}
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
            </ModalForm>
            <ModalFooter
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

export default ModalAddressCreate;
