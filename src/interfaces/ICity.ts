import IState from './IState';

interface ICity {
  id: number;
  name: string;
  state: IState;
}

export default ICity;
