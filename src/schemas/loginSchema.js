import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  email: yup.string().required("E-mail é necessário").email("E-mail inválido"),
  password: yup.string().required("Senha é necessária"),
});