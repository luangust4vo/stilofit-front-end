import * as yup from "yup";

export const classValidationSchema = yup.object().shape({
    turma: yup.string().required("Nome da turma é obrigatório"),
    vagas: yup
        .number()
        .typeError("Deve ser um número")
        .required("Número de vagas é obrigatório")
        .positive("Deve ser positivo")
        .integer("Deve ser inteiro"),
    tempo: yup
        .number()
        .typeError("Informe a duração em minutos")
        .required("Duração é obrigatória")
        .positive("Deve ser um número positivo")
        .integer("A duração deve ser em minutos inteiros"),
    local: yup.string().required("Local da aula é obrigatório"),
    observacoes: yup.string().max(300, "Máximo de 300 caracteres"),
    cor: yup.string().required("Selecione uma cor"),
});