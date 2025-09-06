import * as yup from "yup";
import { validateCPF } from "../utils/validateCPF";

export const clientValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nome é obrigatório")
    .max(100, "Máximo de 100 caracteres"),
  birthDate: yup.string().required("Data de nascimento é obrigatória"),
  gender: yup.string().required("Sexo é obrigatório"),
  cpf: yup
    .string()
    .required("CPF é obrigatório")
    .test("cpf-valido", "CPF inválido", (value) => validateCPF(value)),
  email: yup
    .string()
    .nullable()
    .email("E-mail inválido")
    .min(3, "O e-mail deve ter no mínimo 3 caracteres")
    .max(100, "O e-mail deve ter no máximo 100 caracteres"),
  guardianName: yup.string().max(100, "Máximo de 100 caracteres"),
  emergencyContact: yup.string().max(100, "Máximo de 100 caracteres"),
  notes: yup.string().max(300, "Máximo de 300 caracteres"),
  address: yup.string().max(300, "Máximo de 300 caracteres"),
  district: yup.string().max(100, "Máximo de 100 caracteres"),
  city: yup.string().max(100, "Máximo de 100 caracteres"),
  state: yup.string().max(2, "Máximo de 2 caracteres"),
  number: yup.string().max(10, "Máximo de 10 caracteres"),
  complement: yup.string().max(100, "Máximo de 100 caracteres"),
  additionalInfo: yup.string().max(300, "Máximo de 300 caracteres"),
  consultant: yup.string().max(100, "Máximo de 100 caracteres"),
});
