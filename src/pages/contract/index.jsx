import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import { NumericFormat } from "react-number-format";
import {
  validationSchemaContract,
  fetchAddressByCEP,
} from "../../utils/validation";
import { MaskedInput, Button, Input, Textarea, Select } from "../../components";

import "./styles.scss";
import "react-toastify/dist/ReactToastify.css";

const RegisterContract = () => {
  const methods = useForm({
    // validationSchemaContract - atualizar
    resolver: yupResolver(validationSchemaContract),
  });

  const { handleSubmit, setValue, watch } = methods;

  const contract = watch();

  // pensar se precisa
  const [editableFields, setEditableFields] = useState({
    address: true,
    district: true,
    city: true,
    state: true,
  });

  // pensar se precisa desse método
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

  // OK
  const onSubmit = (data) => {
    const contracts = JSON.parse(localStorage.getItem("contratos")) || [];
    const newContract = { ...data, id: crypto.randomUUID() };
    localStorage.setItem(
      "contratos",
      JSON.stringify([...contracts, newContract])
    );
    toast.success("Contrato cadastrado!");
    useForm.reset();
  };

  // editar conforme atributos da história de usuário (HU02-E02)
  return (
    <div className="container">
      <main className="form">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="block">
              <h3>Dados do Contrato</h3>
              <Input label="Nome" name="name" required />
              <Select label="Status" name="saleStatus">
                <option value="">Selecione</option>
                <option value="Solteiro">Disponível</option>
                <option value="Casado">Não Disponível</option>
              </Select>
            </div>

            <div className="block">
              <h3>Parcelamento</h3>
              <Select label="Parcelamento" name="installments">
                <option value="">Selecione</option>
                <option value="parcelavel">Parcelável</option>
                <option value="aVista">À vista</option>
              </Select>
              <Select label="Nº de parcelas" name="months">
                <option value="">Nº de parcelas</option>
                <option value="x2">2</option>
                <option value="x4">4</option>
                <option value="x6">6</option>
                <option value="x8">8</option>
                <option value="x10">10</option>
                <option value="x12">12</option>
              </Select>
              <NumericFormat
                name="installmentsValue"
                customInput={Input}
                label="Valor da Parcela"
                placeholder="R$ "
                prefix="R$ "
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale
                allowLeadingZeros={false}
                allowNegative={false}
              />
              <NumericFormat
                name="totalValue"
                customInput={Input}
                label="Valor Total"
                placeholder="R$ "
                prefix="R$ "
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale
                allowLeadingZeros={false}
                allowNegative={false}
                required
              />
            </div>

            <div className="block">
              <h3>Vencimento</h3>
            </div>

            <div className="block">
              <h3>Atividades</h3>
            </div>

            <div className="block">
              <h3>Turma e Horário</h3>
            </div>

            {/*
            <div className="block">
              <h3>Dados do Contrato</h3>
              <Input label="Nome" name="name" required />
              <Input label="Email" name="email" />
              <MaskedInput
                label="Data de Nascimento"
                name="birthDate"
                mask="00/00/0000"
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
              <Input label="RG" name="rg" />
              <Select label="Estado Civil" name="maritalStatus">
                <option value="">Selecione</option>
                <option value="Solteiro">Solteiro</option>
                <option value="Casado">Casado</option>
                <option value="Divorciado">Divorciado</option>
                <option value="Viúvo">Viúvo</option>
                <option value="Separado">Separado</option>
              </Select>
              <MaskedInput
                label="Vencimento Exame Médico"
                name="medicalExamDueDate"
                mask="00/00/0000"
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
            */}
            <Button>Salvar</Button>
          </form>
        </FormProvider>
        <ToastContainer position="top-right" autoClose={3000} />
      </main>
    </div>
  );
};

export default RegisterContract;
