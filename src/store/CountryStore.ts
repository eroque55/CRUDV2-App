import { create } from "zustand";
import ICountry from "../interfaces/ICountry";
import IState from "../interfaces/IState";
import ICity from "../interfaces/ICity";
import { getCountries } from "../services/Country.service";

interface CountriesState {
   countries: ICountry[];
   states: IState[];
   cities: ICity[];
   fetchCountries: () => void;
   getStatesByCountry: (countryId?: number) => void;
   getCitiesByState: (stateId?: number) => void;
}

export const useCountries = create<CountriesState>((set, get) => ({
   countries: [],
   states: [],
   cities: [],
   fetchCountries: async () => {
      const fetchedCountries = await getCountries();
      set({ countries: fetchedCountries });
   },
   getStatesByCountry: (countryId?: number) => {
      if (countryId) {
         const { countries } = get();
         const selectedCountryStates = countries.find(
            (country) => country.id === countryId
         )?.states;
         set({ states: selectedCountryStates });
      } else {
         set({ states: [] });
      }
   },
   getCitiesByState: (stateId?: number) => {
      if (stateId) {
         const { states } = get();
         const selectedStateCities = states.find(
            (state) => state.id === stateId
         )?.cities;
         set({ cities: selectedStateCities });
      } else {
         set({ cities: [] });
      }
   },
}));
