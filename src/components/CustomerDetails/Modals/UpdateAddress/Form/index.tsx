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

import { City, Country, State } from "@/src/@types/api";

import { useEffect, useState } from "react";
import { getCountries } from "@/src/services/CountryService";

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
   const [countries, setCountries] = useState<Country[]>([]);
   const [states, setStates] = useState<State[]>([]);
   const [cities, setCities] = useState<City[]>([]);

   useEffect(() => {
      const fetchCountries = async () => {
         const fetchedCountries = await getCountries();
         setCountries(fetchedCountries);
      };
      fetchCountries();
   }, []);

   const getStatesByCountry = (countryId: number) => {
      const selectedCountry = countries.find(
         (country) => country.id === countryId
      );
      if (selectedCountry) {
         setStates(selectedCountry?.states ?? []);
         setCities([]);
         setValue("stateId", 0);
         setValue("cityId", 0);
      }
   };

   const getCitiesByState = (stateId: number) => {
      const selectedState = states.find((state) => state.id === stateId);
      if (selectedState) {
         setCities(selectedState?.cities ?? []);
         setValue("cityId", 0);
      }
   };

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
               {errors.countryId && (
                  <StyledErrorSpan>{errors.countryId.message}</StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledSelect
               {...register("countryId")}
               onChange={(e) => {
                  getStatesByCountry(parseInt(e.target.value));
               }}
            >
               {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                     {country.name}
                  </option>
               ))}
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
               disabled={states.length === 0}
            >
               {states.map((state) => (
                  <option key={state.id} value={state.id}>
                     {state.name}
                  </option>
               ))}
            </StyledSelect>
         </StyledField>

         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>Cidade</StyledLabel>
               {errors.cityId && (
                  <StyledErrorSpan>{errors.cityId.message}</StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledSelect
               {...register("cityId")}
               disabled={cities.length === 0}
            >
               {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                     {city.name}
                  </option>
               ))}
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
