import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { fetchAddressByCEP } from "../../../services/viaCep";
import { toast } from "react-toastify";
import { employeeValidationSchema } from "../../../schemas/employeeSchema";
import {
  MaskedInput,
  Button,
  Input,
  Select,
  CheckboxPanel,
} from "../../../components";
import {
  useGenericContext,
} from "../../../contexts/GenericContext";

import "./style.scss";
import "react-toastify/dist/ReactToastify.css";

const RegisterEmployee = ({ initialData = null, onSubmit: externalSubmit }) => {
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(employeeValidationSchema),
    defaultValues: {
      weekdays: [],
      ...(initialData || {}),
    },
    mode: "onChange",
    shouldFocusError: false,
  });

  const { handleSubmit, setValue, watch, reset } = methods;
  const { addStorageObject, updateStorageObject } = useGenericContext();

  const employee = watch();
  const [editableFields, setEditableFields] = useState({
    address: true,
    district: true,
    city: true,
    state: true,
  });

  const prepareData = (data) => {

    const parsedData = {
      ...data,
      nome: data.name || "",
      dataNascimento: data.birthDate || "",
      cpf: data.cpf || "",
      rg: data.rg || "",
      endereco: data.city + data.state + data.district + data.address + data.number + data.complement || "",
      estadoCivil: data.maritalStatus || "",
      email: data.email || "",
      contato: data.phone || "",
      cargo: data.role || "",
      status: data.status || "",
      turno: data.shift || "",
      dias: Array.isArray(data.weekdays) ? data.weekdays : [],
      jornada: {
        inicio: data.timeMin || "",
        fim: data.timeMax || "",
      }
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
      toast.success("Funcionário atualizado!");
    } else {
      addStorageObject(parsedData);
      toast.success("Funcionário cadastrado!");
      reset();
    }
  };

  const searchAddress = async () => {
    const cep = employee.cep?.replace(/\D/g, "");
    if (cep?.length === 8) {
      const data = await fetchAddressByCEP(cep);
      if (data) {
        setValue("address", data.logradouro || "");
        setValue("district", data.bairro || "");
        setValue("city", data.localidade || "");
        setValue("state", data.uf || "");
        setEditableFields({
          address: false,
          district: false,
          city: false,
          state: false,
        });
      } else {
        setEditableFields({
          address: true,
          district: true,
          city: true,
          state: true,
        });
      }
    }
  };
  return (

    <div className="container-employee-register">
      <Button onClick={() => navigate("/funcionario")}>
        <i className="bi bi-arrow-left"></i>
        Voltar
      </Button>

      <main className="form">

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="block">
              <h3>Dados Gerais do Funcionário</h3>
              <Input label="Nome Completo" name="name" required className="full-width" />
              <div className='row'>
                <Input label="Email" name="email" type="email" required />
                <Input label="Senha" name="password" type="password" required />
              </div>

              <div className='row'>
                <Input label="Data de Nascimento" name="birthDate" type="date" required />
                <Select label="Sexo" name="gender" required>
                  <option value="">Selecione</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                </Select>
                <Select label="Estado Civil" name="maritalStatus">
                  <option value="">Selecione</option>
                  <option value="Solteiro">Solteiro</option>
                  <option value="Casado">Casado</option>
                  <option value="Divorciado">Divorciado</option>
                  <option value="Viúvo">Viúvo</option>
                </Select>
              </div>
              <div className='row'>
                <MaskedInput
                  label="CPF"
                  name="cpf"
                  mask="000.000.000-00"
                  required
                />

                <Input label="RG" name="rg" />
                <Input label="Registro Profissional" name="professionalRegister" required />
              </div>

              <div className='row'>
                <MaskedInput
                  label="Telefone"
                  name="phone"
                  mask="(00) 00000-0000"
                />
                <MaskedInput
                  label="Celular"
                  name="cellphone"
                  mask="(00) 00000-0000"
                />
                <Select label="Cargo" name="role" required>
                  <option value="">Selecione</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Professor">Professor</option>
                  <option value="Personal Trainer">Personal Trainer</option>
                  <option value="Recepcionista">Recepcionista</option>
                </Select>
                <Select label="Status" name="status" required>
                  <option value="Ativo">Ativo</option>
                  <option value="Cancelado">Cancelado</option>
                </Select>
              </div>
            </div>
            <div className="block">
              <h3>Endereço</h3>
              <div className="row">
                <MaskedInput
                  label="CEP"
                  name="cep"
                  mask="00000-000"
                  onBlur={searchAddress}
                />
                <Input
                  label="Endereço"
                  name="address"
                  disabled={!editableFields.address}
                />
                <Input
                  label="Bairro"
                  name="district"
                  disabled={!editableFields.district}
                />
                <Input
                  label="Cidade"
                  name="city"
                  disabled={!editableFields.city}
                />
                <Input label="UF" name="state" disabled={!editableFields.state} />
                <Input label="Número" name="number" />
                <Input label="Complemento" name="complement" />
              </div>
            </div>

            <div className="block">
              <h3>Jornada</h3>
              <div className="row">
                <Select label="Turno" name="shift">
                  <option value="">Selecione</option>
                  <option value="Manhã">Manhã</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Noite">Noite</option>
                </Select>
                <Input label="Horário de Entrada" name="timeMin" type="time" />
                <Input label="Horário de Saída" name="timeMax" type="time" />
              </div>
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

  );
};

export default RegisterEmployee;