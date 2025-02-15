import ICity from "./ICity";

interface IAddress {
   id: number;
   customerId: number;
   nickname: string;
   street: string;
   number: number;
   neighborhood: string;
   cep: string;
   complement?: string;
   city: ICity;
   addressType: "RESIDENCIAL" | "COBRANCA" | "ENTREGA";
   streetType: "RUA" | "AVENIDA" | "TRAVESSA" | "ALAMEDA" | "ESTRADA" | "OUTRO";
   residenceType: "CASA" | "APARTAMENTO" | "OUTRO";
}

export default IAddress;
