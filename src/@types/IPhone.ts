interface IPhone {
   id: number;
   customerId: number;
   ddd: string;
   number: string;
   phoneType: "CELULAR" | "RESIDENCIAL" | "COMERCIAL" | "OUTRO";
}

export default IPhone;
