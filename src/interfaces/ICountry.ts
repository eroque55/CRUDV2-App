import IState from "./IState";

interface ICountry {
   id: number;
   name: string;
   states: IState[];
}

export default ICountry;
