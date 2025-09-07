import * as yup from "yup";
import { validateCPF } from "../utils/validateCPF";

export const clientValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nome é obrigatório")
    .max(100, "Máximo de 100 caracteres"),
  birthDate: yup
    .date()
    .required("A data de nascimento é obrigatória")
    .typeError("Data inválida"),
  gender: yup.string().required("Sexo é obrigatório"),
  cpf: yup
    .string()
    .required("CPF é obrigatório")
    .test("cpf-valido", "CPF inválido", (value) => validateCPF(value)),
  rg: yup.string().max(20, "Máximo de 20 caracteres"),
  email: yup
    .string()
    .nullable()
    .email("E-mail inválido")
    .min(3, "O e-mail deve ter no mínimo 3 caracteres")
    .max(100, "O e-mail deve ter no máximo 100 caracteres"),
  medicalExamDueDate: yup
    .date()
    .nullable()
    .notRequired()
    .typeError("Data inválida"),
  guardianName: yup.string().max(100, "Máximo de 100 caracteres"),
  guardianCpf: yup
    .string()
    .nullable()
    .required("CPF é obrigatório")
    .test("cpf-valido", "CPF inválido", (value) => validateCPF(value))
    .notRequired(),
  guardianPhone: yup
    .string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .notRequired()
    .min(16, "Telefone incompleto"),
  emergencyContact: yup.string().max(100, "Máximo de 100 caracteres"),
  emergencyPhone: yup
    .string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .notRequired()
    .min(16, "Telefone incompleto"),
  notes: yup.string().max(300, "Máximo de 300 caracteres"),
  email_contact: yup
    .string()
    .nullable()
    .email("E-mail inválido")
    .min(3, "O e-mail deve ter no mínimo 3 caracteres")
    .max(100, "O e-mail deve ter no máximo 100 caracteres"),
  cellphone: yup
    .string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .notRequired()
    .min(16, "Telefone incompleto"),
  cep: yup
    .string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .notRequired()
    .min(9, "CEP incompleto"),
  address: yup.string().max(300, "Máximo de 300 caracteres"),
  district: yup.string().max(100, "Máximo de 100 caracteres"),
  city: yup
    .string()
    .max(100, "Máximo de 100 caracteres")
    .matches(/^[a-zA-Z]+$/, "Deve conter apenas letras"),
  state: yup
    .string()
    .max(2, "Máximo de 2 letras")
    .matches(/^[a-zA-Z]+$/, "Deve conter apenas letras"),
  number: yup.string().max(10, "Máximo de 10 caracteres"),
  complement: yup.string().max(100, "Máximo de 100 caracteres"),
  additionalInfo: yup.string().max(300, "Máximo de 300 caracteres"),
  consultant: yup.string().max(100, "Máximo de 100 caracteres"),
});
