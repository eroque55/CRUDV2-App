import { useEffect, useState } from "react";
import { getClientes } from "@/src/services/ClienteService";
import Cliente from "@/src/@types/ICliente";

export default function useClientes() {
   const [clientes, setClientes] = useState<Cliente[]>([]);

   useEffect(() => {
      async function fetchData() {
         try {
            const data = await getClientes();
            setClientes(data);
         } catch (error) {
            console.error("Erro ao buscar os clientes: ", error);
         }
      }
      fetchData();
   }, []);

   return clientes;
}
