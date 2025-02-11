interface ICard {
   _id: number;
   _customerId: number;
   _number: string;
   _cardholder: string;
   _cvv: string;
   _expirationDate: string;
   _preferential: boolean;
   _cardBrand:
      | "VISA"
      | "MASTERCARD"
      | "AMERICAN_EXPRESS"
      | "DISCOVER"
      | "DINERS_CLUB"
      | "JCB"
      | "OUTRAS";
}

export default ICard;
