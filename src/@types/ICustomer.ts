interface ICustomer {
   id: number;
   name: string;
   birthDate: Date;
   cpf: string;
   gender: "MASCULINO" | "FEMININO" | "OUTRO";
   email: string;
   status: boolean;
   ranking: number;
   password: string;
   confPassword: string;
}

export default ICustomer;
