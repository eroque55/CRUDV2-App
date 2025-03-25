import ICustomer from "./ICustomer";

interface IPhone {
   id?: number;
   customer: ICustomer;
   ddd: string;
   number: string;
   phoneType: "CELULAR" | "RESIDENCIAL" | "COMERCIAL";
}

export default IPhone;
