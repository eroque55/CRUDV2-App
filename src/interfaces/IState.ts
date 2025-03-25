import ICity from "./ICity";
import ICountry from "./ICountry";

interface IState {
   id: number;
   name: string;
   country: ICountry;
   cities: ICity[];
}

export default IState;
