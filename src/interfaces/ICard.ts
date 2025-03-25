import ICustomer from "./ICustomer";

interface ICard {
   id: number;
   customer: ICustomer;
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
      | "DINNERS_CLUB"
      | "JCB"
      | "OUTRA";
}

export default ICard;
