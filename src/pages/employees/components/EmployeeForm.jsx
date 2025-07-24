import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { Input, Select } from "../../../components"; // ajuste para seu alias
import "react-toastify/dist/ReactToastify.css";

const validationSchema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  cpf: yup.string().required("CPF é obrigatório").length(11, "CPF inválido"),
  sexo: yup.string().required("Sexo é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  senha: yup.string().min(6, "Senha muito curta").required("Senha é obrigatória"),
  registroProfissional: yup.string().required("Registro Profissional é obrigatório"),
  cargo: yup.string().required("Cargo é obrigatório"),
});

const EmployeeForm = ({ initialData = null, onSubmit: externalSubmit }) => {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      status: "ativo",
      ...initialData,
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data) => {
    if (externalSubmit) {
      externalSubmit(data);
    } else {
      const funcionarios = JSON.parse(localStorage.getItem("funcionarios") || "[]");
      if (initialData && initialData.id) {
        const updated = funcionarios.map(f => f.id === initialData.id ? { ...data, id: f.id } : f);
        localStorage.setItem("funcionarios", JSON.stringify(updated));
        toast.success("Funcionário atualizado com sucesso!");
      } else {
        const id = Date.now().toString();
        localStorage.setItem("funcionarios", JSON.stringify([...funcionarios, { ...data, id }]));
        toast.success("Funcionário cadastrado com sucesso!");
        reset(); // limpa o formulário
      }
    }
  };

  return (
    <div className="container-class">
      <main className="form-class">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="block">
              <h3>Dados gerais do funcionário</h3>

              <Input label="Nome" name="nome" placeholder="Digite o nome" />
              <Input label="CPF" name="cpf" placeholder="Digite o CPF" />
              <Input label="RG" name="rg" placeholder="Digite o RG" />
              <Input label="Sexo" name="sexo" placeholder="Digite o sexo" />
              <Input label="Data de Nascimento" name="dataNascimento" type="date" />
              <Select label="Estado Civil" name="estadoCivil">
                <option value="">Selecione</option>
                <option value="solteiro">Solteiro</option>
                <option value="casado">Casado</option>
                <option value="divorciado">Divorciado</option>
                <option value="viuvo">Viúvo</option>
                <option value="outro">Outro</option>
              </Select>
              <Input label="E-mail" name="email" placeholder="Digite o e-mail" />
              <Input label="Senha" name="senha" type="password" placeholder="Digite a senha" />
              <Input label="Telefone" name="telefone" placeholder="Digite o telefone" />
              <Input label="Registro Profissional" name="registroProfissional" />
              <Input label="Cargo" name="cargo" placeholder="Digite o cargo" />

              <Select label="Jornada de Trabalho" name="jornadaTrabalho">
                <option value="">Selecione</option>
                <option value="matutino">Matutino</option>
                <option value="vespertino">Vespertino</option>
                <option value="noturno">Noturno</option>
              </Select>

              <Select label="Status" name="status">
                <option value="ativo">Ativo</option>
                <option value="inativo">Cancelado</option>
              </Select>

              <button type="submit" className="btn btn-primary">
                {initialData ? "Atualizar" : "Salvar"}
              </button>
            </div>
          </form>
        </FormProvider>
        <ToastContainer position="top-right" autoClose={3000} />
      </main>
    </div>
  );
};

export default EmployeeForm;
