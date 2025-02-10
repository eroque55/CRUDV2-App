interface ICustomer {
   _id: number;
   _name: string;
   _birthDate: Date;
   _cpf: string;
   _gender: "MASCULINO" | "FEMININO" | "OUTRO";
   _email: string;
   _status: boolean;
   _ranking: number;
   _password: string;
   _confPassword: string;
}

export default ICustomer;
