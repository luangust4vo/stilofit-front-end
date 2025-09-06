import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  email: yup.string().required("E-mail é necessário").email("E-mail inválido").min(3, "Mínimo de 3 caracteres").max(100, "Máximo de 100 caracteres"),
  password: yup.string().required("Senha é necessária").min(8, "Mínimo de 8 caracteres").max(30, "Máximo de 30 caracteres"),
});