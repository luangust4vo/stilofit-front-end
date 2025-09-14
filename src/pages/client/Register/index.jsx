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
import { useGenericContext } from "../../../contexts/GenericContext";
import {
  toInternationalFormat,
  toBrazilianFormat,
} from "../../../utils/convertDate";

import "./styles.scss";
import "react-toastify/dist/ReactToastify.css";

const Register = ({ initialData = null, onSubmit: externalSubmit }) => {
  const methods = useForm({
    resolver: yupResolver(clientValidationSchema),
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const { handleSubmit, setValue, watch, reset } = methods;
  const { addStorageObject, updateStorageObject } = useGenericContext();

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
      const transformedData = {
        ...initialData,
        birthDate: toInternationalFormat(initialData.birthDate),
        medicalExamDueDate: toInternationalFormat(
          initialData.medicalExamDueDate
        ),
      };
      reset(transformedData);
    }
  }, [initialData, reset]);

  const onSubmit = (data) => {
    const dataToSave = {
      ...data,
      birthDate: toBrazilianFormat(data.birthDate),
      medicalExamDueDate: toBrazilianFormat(data.medicalExamDueDate),
    };

    if (externalSubmit) {
      externalSubmit(dataToSave);
      return;
    }

    if (initialData && initialData.id) {
      updateStorageObject(initialData.id, dataToSave);
      toast.success("Cliente atualizado!");
    } else {
      addStorageObject(dataToSave);
      toast.success("Cliente cadastrado!");
      reset();
    }
  };

  return (
    <div className="container">
      <main className="form">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="block">
              <h3>Dados do Cliente</h3>
              <Input label="Nome" name="name" required />
              <Input label="Email" name="email" />
              <Input
                label="Data de Nascimento"
                name="birthDate"
                type="date"
                required
              />
              <Select label="Sexo" name="gender" required>
                <option value="">Selecione</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </Select>
              <MaskedInput
                label="CPF"
                name="cpf"
                mask="000.000.000-00"
                required
              />
              <MaskedInput label="RG" name="rg" />
              <Select label="Estado Civil" name="maritalStatus">
                <option value="">Selecione</option>
                <option value="Solteiro">Solteiro</option>
                <option value="Casado">Casado</option>
                <option value="Divorciado">Divorciado</option>
                <option value="Viúvo">Viúvo</option>
                <option value="Separado">Separado</option>
              </Select>
              <Input
                label="Vencimento Exame Médico"
                name="medicalExamDueDate"
                type="date"
              />
            </div>

            <div className="block">
              <h3>Responsável pelo cliente</h3>
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

            <div className="block">
              <h3>Dados de emergência</h3>
              <Input label="Nome do Contato" name="emergencyContact" />
              <MaskedInput
                label="Telefone"
                name="emergencyPhone"
                mask="(00) 00000-0000"
              />
              <Textarea label="Observações" name="notes" />
            </div>

            <div className="block">
              <h3>Dados de contato</h3>
              <Input label="Email" name="email_contact" />
              <MaskedInput
                label="Celular"
                name="cellphone"
                mask="(00) 00000-0000"
              />
            </div>

            <div className="block">
              <h3>Dados de Residência</h3>
              <Select label="Tipo de Residência" name="residenceType">
                <option value="">Selecione</option>
                <option value="Residential">Residencial</option>
                <option value="Commercial">Comercial</option>
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
              <Input
                label="Cidade"
                name="city"
                disabled={!editableFields.city}
              />
              <Input label="UF" name="state" disabled={!editableFields.state} />
              <Input label="Número" name="number" />
              <Input label="Complemento" name="complement" />
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
