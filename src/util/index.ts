export const capitalizeFirstLetter = (str: string) =>
   str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const formatCpf = (cpf: string) => {
   return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export const formatPhone = (phone: string) => {
   return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};
