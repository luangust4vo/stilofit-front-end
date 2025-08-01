import * as yup from "yup";

export const contractValidationSchema = yup.object().shape({
    name: yup.string().required("Nome do Contrato é obrigatório"),
    totalValue: yup.mixed().required("Valor Total é obrigatório"),
    typeExpire: yup.string().required("Tipo de Validade é obrigatório"),
    expire: yup
        .number()
        .typeError("A validade deve ser um número")
        .integer("O número de parcelas deve ser inteiro")
        .required("Limite da Validade é obrigatório")
        .min(1, "A Validade deve ser um número positivo, maior ou igual a 1"),
    installments: yup
        .number()
        .nullable()
        .transform((value, originalValue) => (originalValue === "" ? null : value))
        .integer("O número de parcelas deve ser inteiro")
        .min(1, "O número de parcelas deve ser positivo, maior ou igual a 1")
        .typeError("O número de parcelas deve ser um número"),
});