export const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const formatCPF = (cpf) => {
  const cpfNumbers = cpf.replace(/\D/g, "");
  return cpfNumbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export const formatRG = (rg) => {
  const rgNumbers = rg.replace(/\D/g, "");
  return rgNumbers.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4");
};

export const formatContact = (contact) => {
  const contactNumbers = contact.replace(/\D/g, "");
  return contactNumbers.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
};
