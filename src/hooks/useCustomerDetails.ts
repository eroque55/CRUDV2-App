import { useEffect, useState } from "react";
import { useCustomerState } from "@/src/store/CustomerDetailsStore";

export const useCustomerDetails = (id: number) => {
   const { customer, getCustomer } = useCustomerState();
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      if (isNaN(id)) return;

      const fetchData = async () => {
         try {
            await getCustomer(id);
         } catch (error) {
            console.error("Erro ao buscar cliente:", error);
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, [id, getCustomer]);

   return { customer, loading };
};
