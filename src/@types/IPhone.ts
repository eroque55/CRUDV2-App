interface IPhone {
   _id: number;
   _customerId: number;
   _ddd: string;
   _number: string;
   _phoneType?: "CELULAR" | "RESIDENCIAL" | "COMERCIAL" | "OUTRO";
}

export default IPhone;
