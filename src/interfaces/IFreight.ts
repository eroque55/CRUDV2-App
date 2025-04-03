import IAddress from "./IAddress";
import ICarrier from "./ICarier";
import ISale from "./ISale";

interface IFreight {
   id: number;
   deliveryTime: number;
   address: IAddress;
   carrier: ICarrier;

   sales: ISale[];
}

export default IFreight;
