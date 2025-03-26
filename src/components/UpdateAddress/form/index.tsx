import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { StyledModalForm } from "@/src/components/Modalzz/modal.styles";
import {
   StyledField,
   StyledInput,
   StyledLabel,
   StyledSelect,
   StyledErrorSpan,
   StyledFieldTitle,
   StyledInputMask,
} from "@/src/components/Fields/styles";
import { IAddressSchema } from "@/src/validations/addressSchema";

import { Address, City, Country, State } from "@/src/interfaces/api";

import { useEffect, useState } from "react";
import { getCountries } from "@/src/services/Country.service";

interface Props {
   register: UseFormRegister<IAddressSchema>;
   errors: FieldErrors<IAddressSchema>;
   setValue: UseFormSetValue<IAddressSchema>;
   address: Address;
}

export default function AddressForm({
   register,
   errors,
   setValue,
   address,
}: Props) {
   const [countries, setCountries] = useState<Country[]>([]);
   const [states, setStates] = useState<State[]>([]);
   const [cities, setCities] = useState<City[]>([]);

   const cityId = address.city.id || 0;
   const stateId = address.city.state.id || 0;
   const countryId = address.city.state.country.id || 0;

   useEffect(() => {
      const fetchCountries = async () => {
         const fetchedCountries = await getCountries();
         setCountries(fetchedCountries);

         setValue("countryId", countryId);
         setValue("stateId", stateId);
         setValue("cityId", cityId);

         const selectedCountry = fetchedCountries.find(
            (country) => country.id === countryId
         );
         if (selectedCountry) {
            if (selectedCountry.states) {
               setStates(selectedCountry.states);

               const selectedState = selectedCountry.states.find(
                  (state) => state.id === stateId
               );
               if (selectedState) {
                  selectedState.cities && setCities(selectedState.cities);
               }
            }
         }
      };

      fetchCountries();
   }, [cityId, stateId, countryId, setValue]);

   const getStatesByCountry = (countryId: number) => {
      const selectedCountry = countries.find(
         (country) => country.id === countryId
      );
      if (selectedCountry) {
         setStates(selectedCountry.states ?? []);
         setCities([]);
         setValue("stateId", 0);
         setValue("cityId", 0);
      }
   };

   const getCitiesByState = (stateId: number) => {
      const selectedState = states.find((state) => state.id === stateId);
      if (selectedState) {
         setCities(selectedState.cities ?? []);
         setValue("cityId", 0);
      }
   };
   const cep = address.cep;

   return (
      <StyledModalForm>
         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>Apelido</StyledLabel>
               {errors.nickname && (
                  <StyledErrorSpan>{errors.nickname.message}</StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledInput
               defaultValue={address.nickname}
               {...register("nickname")}
            />
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
            <StyledSelect
               defaultValue={address.residenceType}
               {...register("residenceType")}
            >
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
            <StyledSelect
               defaultValue={address.streetType}
               {...register("streetType")}
            >
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
            <StyledInput
               defaultValue={address.street}
               {...register("street")}
            />
         </StyledField>

         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>Número</StyledLabel>
               {errors.number && (
                  <StyledErrorSpan>{errors.number.message}</StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledInput
               type="number"
               defaultValue={address.number}
               {...register("number")}
            />
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
            <StyledInput
               defaultValue={address.neighborhood}
               {...register("neighborhood")}
            />
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
               defaultValue={countryId}
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
               defaultValue={stateId}
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
               defaultValue={cityId}
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
            <StyledInput
               defaultValue={address.complement}
               {...register("complement")}
            />
         </StyledField>
      </StyledModalForm>
   );
}
