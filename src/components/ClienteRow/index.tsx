import Cliente from "@/src/@types/ICliente";

interface Props {
   cliente: Cliente;
}

const ClienteRow = ({ cliente }: Props) => {
   return (
      <li>
         <p>{cliente._nome}</p>
         <p>{cliente._dataNascimento.toDateString()}</p>
         <p>{cliente._cpf}</p>
         <p>{cliente._genero}</p>
         <p>{cliente._email}</p>
         <p>{cliente._status}</p>
         <p>{cliente._ranking}</p>
      </li>
   );
};

export default ClienteRow;
