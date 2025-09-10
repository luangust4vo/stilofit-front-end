import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { clientValidationSchema } from "../../../schemas";
import { fetchAddressByCEP } from "../../../services/viaCep";
import {
  MaskedInput,
  Button,
  Input,
  Textarea,
  Select,
} from "../../../components";

import "./styles.scss";
import "react-toastify/dist/ReactToastify.css";
import ClientService from "../../../services/ClientService";

const Register = ({ initialData = null, onSubmit: externalSubmit }) => {
  const methods = useForm({
    resolver: yupResolver(clientValidationSchema),
    defaultValues: initialData || {},
  });

  const { handleSubmit, setValue, watch } = methods;

  const clientService = new ClientService();
  const client = watch();

  const [editableFields, setEditableFields] = useState({
    address: true,
    district: true,
    city: true,
    state: true,
  });

  const searchAddress = async () => {
    const cep = client.cep?.replace(/\D/g, "");
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

  useEffect(() => {
    if (initialData) {
      methods.reset(initialData);
    }
  }, [initialData]);

  const onSubmit = async (data) => {
    const payload = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        value === "" ? null : value,
      ])
    );

    if (externalSubmit) {
      externalSubmit(data);
      return;
    }

    if (initialData && initialData.id) {
      await clientService.update(initialData.id, payload);
      toast.success("Cliente atualizado!");
    } else {
      await clientService.create(payload);
      toast.success("Cliente cadastrado!");
      methods.reset();
    }
  };

  return (
    <div className="container">
      <main className="form">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="block">
              <h3>Dados do Cliente</h3>
              <div className="row">
                <Input label="Nome" name="name" required />
                <Input label="Email" name="email" />
              </div>
              <div className="row">
                <MaskedInput
                  label="Data de Nascimento"
                  name="birthDate"
                  mask="00/00/0000"
                  required
                />
                <Select label="Sexo" name="gender" required>
                  <option value="">Selecione</option>
                  <option value="MASCULINO">Masculino</option>
                  <option value="FEMININO">Feminino</option>
                </Select>
                <MaskedInput
                  label="CPF"
                  name="cpf"
                  mask="000.000.000-00"
                  required
                />
                <MaskedInput label="RG" name="rg" />
              </div>
              <div className="row">
                <Select label="Estado Civil" name="maritalStatus">
                  <option value="">Selecione</option>
                  <option value="SOLTEIRO">Solteiro</option>
                  <option value="CASADO">Casado</option>
                  <option value="DIVORCIADO">Divorciado</option>
                  <option value="VIÚVO">Viúvo</option>
                  <option value="SEPARADO">Separado</option>
                </Select>
                <MaskedInput
                  label="Vencimento Exame Médico"
                  name="medicalExamDueDate"
                  mask="00/00/0000"
                />
              </div>
            </div>

            <div className="block">
              <h3>Responsável pelo cliente</h3>
              <div className="row">
                <Input label="Nome" name="guardianName" />
                <MaskedInput
                  label="CPF"
                  name="guardianCpf"
                  mask="000.000.000-00"
                />
                <MaskedInput
                  label="Telefone"
                  name="guardianPhone"
                  mask="(00) 00000-0000"
                />
              </div>
            </div>

            <div className="block">
              <h3>Dados de emergência</h3>
              <div className="row">
                <Input label="Nome do Contato" name="emergencyContact" />
                <MaskedInput
                  label="Telefone"
                  name="emergencyPhone"
                  mask="(00) 00000-0000"
                />
              </div>

              <Textarea label="Observações" name="notes" />
            </div>

            <div className="block">
              <h3>Dados de contato</h3>
              <div className="row">
                <Input label="Email" name="email_contact" />
                <MaskedInput
                  label="Celular"
                  name="cellphone"
                  mask="(00) 00000-0000"
                />
              </div>
            </div>

            <div className="block">
              <h3>Dados de Residência</h3>
              <div className="row">
                <Select label="Tipo de Residência" name="residenceType">
                  <option value="">Selecione</option>
                  <option value="RESIDENCIAL">Residencial</option>
                  <option value="COMERCIAL">Comercial</option>
                </Select>
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
              </div>
              <div className="row">
                <Input
                  label="Cidade"
                  name="city"
                  disabled={!editableFields.city}
                />
                <Input
                  label="UF"
                  name="state"
                  disabled={!editableFields.state}
                />
                <Input label="Número" name="number" />
                <Input label="Complemento" name="complement" />
              </div>
            </div>

            <div className="block">
              <h3>Informações Adicionais</h3>
              <Textarea label="Informações adicionais" name="additionalInfo" />
            </div>

            <div className="block">
              <h3>Responsabilidade</h3>
              <Input label="Consultor" name="consultant" />
            </div>
            <Button>{initialData ? "Atualizar" : "Salvar"}</Button>
          </form>
        </FormProvider>
      </main>
    </div>
  );
};

export default Register;
