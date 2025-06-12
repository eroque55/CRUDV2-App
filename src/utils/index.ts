export const capitalizeFirstLetter = (str: string) => {
  const [...words] = str.split('_');
  const capitalizedWords = words.map(
    word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
  );
  return capitalizedWords.join(' ');
};

export const formatCpf = (cpf: string) => {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export const formatPhone = (phone: string) => {
  return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
};

export const formatCep = (cep: string) => {
  return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
};

export const formatCurrency = (value: number) => {
  if (!value) {
    return 'R$ 0,00';
  }

  return `R$ ${value.toFixed(2).replace('.', ',')}`;
};
