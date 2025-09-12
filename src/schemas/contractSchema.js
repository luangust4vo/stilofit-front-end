import * as yup from "yup";

export const contractValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nome do Contrato é obrigatório")
    .max(100, "Máximo de 100 caracteres"),
  totalValue: yup
    .number()
    .typeError("O valor deve ser um número")
    .required("Valor Total é obrigatório")
    .transform((value, originalValue) => {
      if (typeof originalValue === "string") {
        const cleanedValue = originalValue
          .replace(/[R$\s.]/g, "")
          .replace(",", ".");
        return parseFloat(cleanedValue) || null;
      }
      return value;
    })
    .positive("O valor deve ser positivo")
    .max(1000000, "O valor máximo permitido é R$ 1.000.000,00"),
  typeExpire: yup.string().required("Tipo de Validade é obrigatório"),
  expire: yup
    .number()
    .typeError("A validade deve ser um número")
    .integer("O número de parcelas deve ser inteiro")
    .required("Limite da Validade é obrigatório")
    .positive("A validade deve ser positiva")
    .max(1000, "Máximo de 1000"),
  installments: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .integer("O número de parcelas deve ser inteiro")
    .positive("O número de parcelas deve ser positivo")
    .typeError("O número de parcelas deve ser um número")
    .max(1000, "No máximo 1000 parcelas"),
  timeMin: yup
    .string()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .notRequired()
    .matches(/^(\d{2}):(\d{2})$/, "O formato do horário deve ser 'hh:mm'"),
});
