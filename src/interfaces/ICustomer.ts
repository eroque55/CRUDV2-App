import IAddress from "./IAddress";
import ICard from "./ICard";
import IPhone from "./IPhone";

interface ICustomer {
   id: number;
   name: string;
   birthDate: Date;
   cpf: string;
   gender: "FEMININO" | "MASCULINO" | "OUTRO";
   email: string;
   password: string;
   confPassword: string;
   status: boolean;
   ranking: number;
   addresses: IAddress[];
   cards: ICard[];
   phone: IPhone;
}

export default ICustomer;
