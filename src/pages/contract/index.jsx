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

  const installments = watch("installments");
  const typeExpire = watch("typeExpire");

  let expireLabel = "Qtde. de ";
  if (typeExpire === "porSecao") {
    expireLabel += "Seções";
  } else if (typeExpire === "porPeriodo") {
    expireLabel += "Períodos";
  }

  // pensar se precisa
  const [editableFields, setEditableFields] = useState({
    //atribute: true,
  });

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
              <h3>Dados Gerais do Contrato</h3>
              <Input label="Nome do Contrato" name="name" required />
              <Select label="Status" name="saleStatus">
                <option value="">Selecione</option>
                <option value="Solteiro">Disponível</option>
                <option value="Casado">Não Disponível</option>
              </Select>
              <Select label="Template" name="template">
                <option value="">Selecione</option>
                <option value="option1">Opção 1</option>
                <option value="option2">Opção 2</option>
              </Select>
            </div>

            <div className="block">
              <h3>Parcelamento</h3>
              <Select label="Parcelamento" name="installments">
                <option value="">Selecione</option>
                <option value="parcelavel">Parcelável</option>
                <option value="aVista">À vista</option>
              </Select>
              <Input
                label="Nº de parcelas"
                name="nInstallments"
                type="number"
                min={0}
                disabled={installments === "aVista"}
              />
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
                disabled={installments === "aVista"}
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
              <Select label="Tipo de Vencimento" name="typeExpire">
                <option value="">Selecione</option>
                <option value="porSecao">por Seção</option>
                <option value="porPeriodo">por Período</option>
              </Select>
              <Input
                label={expireLabel}
                name="expire"
                type="number"
                min={0}
                disabled={typeExpire === ""}
              />
            </div>

            <div className="block">
              <h3>Turma</h3>
              <Select label="Turma" name="class">
                <option value="">Escolha a Turma</option>
                <option value="class1">Turma 1</option>
                <option value="class2">Turma 2</option>
              </Select>
              <Input label="Horário" name="time" type="time" required />

              {/* Vou criar um componente */}
              <h4>Dias da Semana</h4>
              <label>
                <input
                  type="checkbox"
                  value="domingo"
                  {...methods.register("weekdays")}
                />
                Dom
              </label>
              <label>
                <input
                  type="checkbox"
                  value="segunda"
                  {...methods.register("weekdays")}
                />
                Seg
              </label>
              <label>
                <input
                  type="checkbox"
                  value="terca"
                  {...methods.register("weekdays")}
                />
                Ter
              </label>
              <label>
                <input
                  type="checkbox"
                  value="quarta"
                  {...methods.register("weekdays")}
                />
                Qua
              </label>
              <label>
                <input
                  type="checkbox"
                  value="quinta"
                  {...methods.register("weekdays")}
                />
                Qui
              </label>
              <label>
                <input
                  type="checkbox"
                  value="sexta"
                  {...methods.register("weekdays")}
                />
                Sex
              </label>
              <label>
                <input
                  type="checkbox"
                  value="sabado"
                  {...methods.register("weekdays")}
                />
                Sáb
              </label>
            </div>

            <Button>Salvar</Button>
          </form>
        </FormProvider>
        <ToastContainer position="top-right" autoClose={3000} />
      </main>
    </div>
  );
};

export default RegisterContract;
