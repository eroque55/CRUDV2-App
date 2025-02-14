import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { StyledModalForm } from "@/src/components/commom/Modal/modal.styles";
import {
   StyledField,
   StyledInput,
   StyledLabel,
   StyledSelect,
   StyledErrorSpan,
   StyledFieldTitle,
   StyledInputMask,
} from "@/src/components/commom/Fields/index.styles";
import { IAddressSchema } from "@/src/validations/addressSchema";

import ICountry from "@/src/@types/ICountry";
import IState from "@/src/@types/IState";
import ICity from "@/src/@types/ICity";

import { useCountryStore } from "@/src/store/CountryStore";
import { useStateStore } from "@/src/store/StateStore";
import { useCityStore } from "@/src/store/CityStore";
import { useEffect } from "react";

interface Props {
   register: UseFormRegister<IAddressSchema>;
   errors: FieldErrors<IAddressSchema>;
   setValue: UseFormSetValue<IAddressSchema>;
   cep: string;
}

export default function AddressForm({
   register,
   errors,
   setValue,
   cep,
}: Props) {
   const { countries, getCountries } = useCountryStore();
   const { states, getStatesByCountry } = useStateStore();
   const { cities, getCitiesByState } = useCityStore();

   useEffect(() => {
      getCountries();
      getStatesByCountry(1);
      getCitiesByState(1);
   }, []);

   return (
      <StyledModalForm>
         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>Apelido</StyledLabel>
               {errors.nickname && (
                  <StyledErrorSpan>{errors.nickname.message}</StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledInput {...register("nickname")} />
         </StyledField>

         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>CEP</StyledLabel>
               {errors.cep && (
                  <StyledErrorSpan>{errors.cep.message}</StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledInputMask
               mask="00000-000"
               defaultValue={cep}
               onAccept={(value) => {
                  setValue("cep", value.replace(/[-]/g, ""), {
                     shouldValidate: true,
                  });
               }}
               {...register("cep")}
            />
         </StyledField>

         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>Tipo de residência</StyledLabel>
               {errors.residenceType && (
                  <StyledErrorSpan>
                     {errors.residenceType.message}
                  </StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledSelect {...register("residenceType")}>
               <option value="CASA">Casa</option>
               <option value="APARTAMENTO">Apartamento</option>
               <option value="OUTRO">Outro</option>
            </StyledSelect>
         </StyledField>

         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>Tipo de logradouro</StyledLabel>
               {errors.streetType && (
                  <StyledErrorSpan>{errors.streetType.message}</StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledSelect {...register("streetType")}>
               <option value="RUA">Rua</option>
               <option value="AVENIDA">Avenida</option>
               <option value="TRAVESSA">Travessa</option>
               <option value="ALAMEDA">Alameda</option>
               <option value="ESTRADA">Estrada</option>
               <option value="OUTRO">Outro</option>
            </StyledSelect>
         </StyledField>

         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>Logradouro</StyledLabel>
               {errors.street && (
                  <StyledErrorSpan>{errors.street.message}</StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledInput {...register("street")} />
         </StyledField>

         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>Número</StyledLabel>
               {errors.number && (
                  <StyledErrorSpan>{errors.number.message}</StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledInput type="number" {...register("number")} />
         </StyledField>

         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>Bairro</StyledLabel>
               {errors.neighborhood && (
                  <StyledErrorSpan>
                     {errors.neighborhood.message}
                  </StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledInput {...register("neighborhood")} />
         </StyledField>

         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>Pais</StyledLabel>
               {errors.contryId && (
                  <StyledErrorSpan>{errors.contryId.message}</StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledSelect
               {...register("contryId")}
               onChange={(e) => {
                  getStatesByCountry(parseInt(e.target.value));
               }}
            >
               {countries.map((country: ICountry) => {
                  return (
                     <option key={country._id} value={country._id}>
                        {country._name}
                     </option>
                  );
               })}
            </StyledSelect>
         </StyledField>

         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>Estado</StyledLabel>
               {errors.stateId && (
                  <StyledErrorSpan>{errors.stateId.message}</StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledSelect
               {...register("stateId")}
               onChange={(e) => {
                  getCitiesByState(parseInt(e.target.value));
               }}
            >
               {states.map((state: IState) => {
                  return (
                     <option key={state._id} value={state._id}>
                        {state._name}
                     </option>
                  );
               })}
            </StyledSelect>
         </StyledField>

         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>Cidade</StyledLabel>
               {errors.cityId && (
                  <StyledErrorSpan>{errors.cityId.message}</StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledSelect {...register("cityId")}>
               {cities.map((city: ICity) => {
                  return (
                     <option key={city._id} value={city._id}>
                        {city._name}
                     </option>
                  );
               })}
            </StyledSelect>
         </StyledField>

         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>Complemento (opcional)</StyledLabel>
               {errors.complement && (
                  <StyledErrorSpan>{errors.complement.message}</StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledInput {...register("complement")} />
         </StyledField>
      </StyledModalForm>
   );
}
