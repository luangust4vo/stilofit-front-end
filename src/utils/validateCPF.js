export const validateCPF = (cpf) => {
  if (!cpf) return true;

  let sum = 0,
    rest;
  const cpfDigits = cpf.replace(/\D/g, "");

  if (cpfDigits.length !== 11 || /^(\d)\1{10}$/.test(cpfDigits)) return false;

  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpfDigits[i]) * (10 - i);
  }

  rest = (sum * 10) % 11;
  rest = rest === 10 || rest === 11 ? 0 : rest;

  if (rest !== parseInt(cpfDigits[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpfDigits[i]) * (11 - i);
  }

  rest = (sum * 10) % 11;
  rest = rest === 10 || rest === 11 ? 0 : rest;

  return rest === parseInt(cpfDigits[10]);
};
