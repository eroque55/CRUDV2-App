import IAddress from "./IAddress";
import ICustomer from "./ICustomer";
import IPhone from "./IPhone";

interface ICreateCustomer {
   customer: ICustomer;
   phone: IPhone;
   billingAddress: IAddress;
   deliveryAddress: IAddress;
}

export default ICreateCustomer;
