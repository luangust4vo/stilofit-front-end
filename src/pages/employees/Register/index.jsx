import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { contractValidationSchema } from "../../../schemas";
import {
  Button,
  Input,
  Select,
  CheckboxPanel,
  MonetaryInput,
  MultiSelect,
  LayoutMenu,
} from "../../../components";
import {
  GenericContextProvider,
  useGenericContext,
} from "../../../contexts/GenericContext";

import "./style.scss";
import "react-toastify/dist/ReactToastify.css";

const RegisterContract = ({ initialData = null, onSubmit: externalSubmit }) => {
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(contractValidationSchema),
    defaultValues: initialData || {},
  });

  const { handleSubmit, setValue, watch, reset } = methods;
  const { addStorageObject, updateStorageObject } = useGenericContext();
  const installmentable = watch("installmentable");
  const typeExpire = watch("typeExpire");

  useEffect(() => {
    if (installmentable === "aVista") {
      setValue("installments", undefined);
    }
  }, [installmentable, setValue]);

  let expireLabel = "Validade por ";
  let expirePlaceHolder = "";
  if (typeExpire === "por Seções") {
    expireLabel += "Seções";
    expirePlaceHolder += "Aulas";
  } else if (typeExpire === "por Tempo") {
    expireLabel += "Tempo";
    expirePlaceHolder += "Meses";
  }

  const [classRoms, setClassRoms] = useState([]);
  useEffect(() => {
    const classRomsStorage = localStorage.getItem("turmas");
    if (classRomsStorage) {
      setClassRoms(JSON.parse(classRomsStorage));
    }
  }, []);

  const prepareData = (data) => {
    const installments = data.installments ? Number(data.installments) : "";
    const totalValue = data.totalValue
      ? Number(
        String(data.totalValue)
          .replace("R$ ", "")
          .replace(/\./g, "")
          .replace(",", ".")
      )
      : "";
    const installmentsValue =
      installments && totalValue
        ? Number((totalValue / installments).toFixed(2))
        : "";
    const parsedData = {
      ...data,
      status: data.status || "",
      template: data.template || "",
      installmentable: data.installmentable || "",
      installments,
      totalValue,
      installmentsValue,
      expire: data.expire ? Number(data.expire) : "",
      classRoms: Array.isArray(data.classRoms)
        ? data.classRoms
        : data.classRoms
          ? [data.classRoms]
          : [],
      timeMin: data.timeMin || "",
      timeMax: data.timeMax || "",
      weekdays: Array.isArray(data.weekdays) ? data.weekdays : [],
    };
    return parsedData;
  };

  const onSubmit = (data) => {
    const parsedData = prepareData(data);

    if (externalSubmit) {
      externalSubmit(parsedData);
      return;
    }

    if (initialData && initialData.id) {
      updateStorageObject(initialData.id, parsedData);
      toast.success("Contrato atualizado!");
    } else {
      addStorageObject(parsedData);
      toast.success("Contrato cadastrado!");
      reset();
    }
  };

  return (
    <LayoutMenu>
      <div className="container-contract-register">
        <Button onClick={() => navigate("/contrato")}>
          <i className="bi bi-arrow-left"></i>
          Voltar
        </Button>

        <main className="form">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="block">
  <h3>Dados Gerais do Funcionário</h3>
  <Input label="Nome" name="name" required />
  <Input label="Email" name="email" type="email" required />
  <Input label="Senha" name="password" type="password" required />
  <Input label="Data de Nascimento" name="birthDate" type="date" required />
  <Select label="Sexo" name="gender" required>
    <option value="">Selecione</option>
    <option value="Masculino">Masculino</option>
    <option value="Feminino">Feminino</option>
    <option value="Outro">Outro</option>
  </Select>
  <Input label="CPF" name="cpf" required />
  <Input label="RG" name="rg" />
  <Input label="Registro Profissional" name="professionalRegister" required />
  <Select label="Estado Civil" name="maritalStatus">
    <option value="">Selecione</option>
    <option value="Solteiro">Solteiro</option>
    <option value="Casado">Casado</option>
    <option value="Divorciado">Divorciado</option>
    <option value="Viúvo">Viúvo</option>
  </Select>
  <Input label="Cargo" name="role" required />
  <Select label="Status" name="status" required>
    <option value="Ativo">Ativo</option>
    <option value="Cancelado">Cancelado</option>
  </Select>
</div>

<div className="block">
  <h3>Contato</h3>
  <Input label="Telefone" name="phone" />
  <Input label="Celular" name="cellphone" />
</div>

<div className="block">
  <h3>Endereço</h3>
  <Input label="CEP" name="cep" />
  <Input label="Rua" name="street" />
  <Input label="Número" name="number" />
  <Input label="Complemento" name="complement" />
  <Input label="Bairro" name="neighborhood" />
  <Input label="Cidade" name="city" />
  <Input label="Estado" name="state" />
</div>

<div className="block">
  <h3>Jornada</h3>
  <Select label="Turno" name="shift">
    <option value="">Selecione</option>
    <option value="Manhã">Manhã</option>
    <option value="Tarde">Tarde</option>
    <option value="Noite">Noite</option>
  </Select>
  <Input label="Horário de Entrada" name="timeMin" type="time" />
  <Input label="Horário de Saída" name="timeMax" type="time" />
  <CheckboxPanel
    name="weekdays"
    label="Dias da Semana"
    options={[
      { value: "domingo", label: "Dom" },
      { value: "segunda", label: "Seg" },
      { value: "terca", label: "Ter" },
      { value: "quarta", label: "Qua" },
      { value: "quinta", label: "Qui" },
      { value: "sexta", label: "Sex" },
      { value: "sabado", label: "Sáb" },
    ]}
  />
</div>

              <Button>{initialData ? "Atualizar" : "Salvar"}</Button>
            </form>
          </FormProvider>
        </main>
      </div>
    </LayoutMenu>
  );
};

export default (props) => (
  <GenericContextProvider lSName="contratos">
    <RegisterContract {...props} />
  </GenericContextProvider>
);
