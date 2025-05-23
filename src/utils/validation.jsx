import * as yup from "yup";

const fetchAddressByCEP = async (cep) => {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    if (data.erro) return null;
    return data;
  } catch (error) {
    return null;
  }
};

const validateCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i);
  let rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf[9])) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  return rest === parseInt(cpf[10]);
};

const validationSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  birthDate: yup.string().required("Data de nascimento é obrigatória"),
  gender: yup.string().required("Sexo é obrigatório"),
  cpf: yup
    .string()
    .required("CPF é obrigatório")
    .test("cpf-valido", "CPF inválido", (value) => validateCPF(value)),
  email: yup.string().nullable().email("E-mail inválido"),
});

const validationSchemaContract = yup.object().shape({
  name: yup.string().required("Nome do Contrato é obrigatório"),
  totalValue: yup.mixed().required("Valor Total é obrigatório"),
  typeExpire: yup.string().required("Tipo de Validade é obrigatório"),
  expire: yup.string().required("Limite da Validade é obrigatório"),
  // Conferir mixed e string
});

export { fetchAddressByCEP, validationSchema, validationSchemaContract };
