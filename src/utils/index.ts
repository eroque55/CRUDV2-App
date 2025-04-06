import IBook from "../interfaces/IBook";

export const capitalizeFirstLetter = (str: string) =>
   str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const formatCpf = (cpf: string) => {
   return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export const formatPhone = (phone: string) => {
   return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};

export const formatCep = (cep: string) => {
   return cep.replace(/(\d{5})(\d{3})/, "$1-$2");
};

export const getBookValue = (book: IBook, qtd?: number) => {
   const maxCost = book.stock.stockMovement.reduce((max, current) =>
      Number(current.cost) > Number(max.cost) ? current : max
   ).cost;

   let value = Number(maxCost) + book.priceGroup.tax;

   if (qtd) {
      value = value * qtd;
   }

   return value.toFixed(2).replace(".", ",");
};
