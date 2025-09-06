import * as yup from "yup";

export const contractValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nome do Contrato é obrigatório")
    .max(100, "Máximo de 100 caracteres"),
  totalValue: yup.mixed().required("Valor Total é obrigatório"),
  typeExpire: yup.string().required("Tipo de Validade é obrigatório"),
  expire: yup
    .number()
    .typeError("A validade deve ser um número")
    .integer("O número de parcelas deve ser inteiro")
    .required("Limite da Validade é obrigatório")
    .positive("A validade deve ser positiva"),
  installments: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .integer("O número de parcelas deve ser inteiro")
    .positive("O número de parcelas deve ser positivo")
    .typeError("O número de parcelas deve ser um número"),
});
