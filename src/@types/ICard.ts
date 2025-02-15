interface ICard {
   id: number;
   customerId: number;
   number: string;
   cardholder: string;
   cvv: string;
   expirationDate: string;
   preferential: boolean;
   cardBrand:
      | "VISA"
      | "MASTERCARD"
      | "AMERICAN_EXPRESS"
      | "DISCOVER"
      | "DINERS_CLUB"
      | "JCB"
      | "OUTRA";
}

export default ICard;
