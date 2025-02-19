import {
   AddressType,
   CardBrand,
   Gender,
   PhoneType,
   ResidenceType,
   StreetType,
} from "./enums";

export interface Address {
   id?: number;
   customer?: Customer;
   nickname?: string;
   street?: string;
   number?: number;
   neighborhood?: string;
   cep?: string;
   complement?: string;
   city?: City;
   addressType?: AddressType;
   streetType?: StreetType;
   residenceType?: ResidenceType;
}

export interface Card {
   id?: number;
   customer?: Customer;
   number?: string;
   cardholder?: string;
   cvv?: string;
   expirationDate?: string;
   preferential?: boolean;
   cardBrand?: CardBrand;
}

export interface City {
   id?: number;
   name?: string;
   state?: State;
}

export interface Country {
   id?: number;
   name?: string;
   states?: State[];
}

export interface Customer {
   id?: number;
   name?: string;
   birthDate?: Date;
   cpf?: string;
   gender?: Gender;
   email?: string;
   password?: string;
   confPassword?: string;
   status?: boolean;
   ranking?: number;
   addresses?: Address[];
   cards?: Card[];
   phones?: Phone[];
}

export interface Phone {
   id?: number;
   customer?: Customer;
   ddd?: string;
   number?: string;
   phoneType?: PhoneType;
}

export interface State {
   id?: number;
   name?: string;
   country: Country;
   cities?: City[];
}
