interface IAddress {
   _id: number;
   _customerId: number;
   _nickname: string;
   _street: string;
   _number: number;
   _neighborhood: string;
   _cep: string;
   _complement?: string;
   _cityId: number;
   _addressType: "RESIDENCIAL" | "COBRANCA" | "ENTREGA";
   _streetType:
      | "RUA"
      | "AVENIDA"
      | "TRAVESSA"
      | "ALAMEDA"
      | "ESTRADA"
      | "OUTRO";
   _residenceType: "CASA" | "APARTAMENTO" | "OUTRO";
}

export default IAddress;
