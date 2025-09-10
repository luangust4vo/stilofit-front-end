import * as yup from "yup";

export const employeeValidationSchema = yup.object().shape({
    name: yup
        .string()
        .required("O nome do funcionário é obrigatório")
        .min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: yup
        .string()
        .required("O email é obrigatório")
        .email("Formato de email inválido"),
    password: yup
        .string()
        .required("A senha é obrigatória")
        .min(6, "A senha deve ter no mínimo 6 caracteres"),
    birthDate: yup
        .date()
        .required("A data de nascimento é obrigatória")
        .typeError("Data inválida"),
    gender: yup
        .string()
        .required("O sexo é obrigatório"),
    maritalStatus: yup.string().nullable(),
    cpf: yup
        .string()
        .required("O CPF é obrigatório")
        .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF deve estar no formato 000.000.000-00"),
    rg: yup
        .string()
        .nullable()
        .matches(/^[A-Za-z0-9]+$/, "O RG deve conter apenas letras e números")
        .test("numero-positivo", "O RG não pode conter número zero ou negativo", (value) => {
            if (!value) return true;
            const numeros = value.replace(/[^0-9]/g, "");
            if (!numeros) return true;
            return Number(numeros) > 0;
        }),
    professionalRegister: yup
        .string()
        .required("O registro profissional é obrigatório"),
    phone: yup
        .string()
        .nullable()
        .matches(/^\d{10,11}$/, "Telefone inválido")
        .notRequired(),
    cellphone: yup
        .string()
        .nullable()
        .matches(/^(\(\d{2}\)\s?\d{4,5}-\d{4}|\d{10,11})$/, "Celular inválido")
        .notRequired(),
    role: yup
        .string()
        .required("O cargo é obrigatório"),
    status: yup
        .string()
        .required("O status é obrigatório"),
    cep: yup
        .string()
        .nullable()
        .min(8, "CEP deve ter 8 dígitos"),
    street: yup.string().nullable(),
    number: yup.string().nullable(),
    complement: yup.string().nullable(),
    neighborhood: yup.string().nullable(),
    city: yup.string().nullable(),
    state: yup.string().nullable(),
    shift: yup.string().nullable(),
    timeMin: yup.string().nullable(),
    timeMax: yup.string().nullable(),
    weekdays: yup.array()
        .of(yup.string())
        .min(1, "Escolha ao menos um dia da semana")
        .required("O campo de dias da semana é obrigatório"),
});
