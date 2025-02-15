import ICountry from "./ICountry";

interface IState {
   id: number;
   name: string;
   country: ICountry;
}

export default IState;
