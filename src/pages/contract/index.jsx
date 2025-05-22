import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import { NumericFormat } from "react-number-format";
import { validationSchemaContract } from "../../utils/validation";
import {
  MaskedInput,
  Button,
  Input,
  Textarea,
  Select,
  CheckboxPanel,
} from "../../components";

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

  let expireLabel = "Validade por ";
  let expirePlaceHolder = "";
  if (typeExpire === "porSecao") {
    expireLabel += "Seções";
    expirePlaceHolder += "aulas";
  } else if (typeExpire === "porTempo") {
    expireLabel += "Tempo";
    expirePlaceHolder += "meses";
  }

  const [turmas, setTurmas] = useState([]);
  useEffect(() => {
    const turmasStorage = localStorage.getItem("turmas");
    if (turmasStorage) {
      setTurmas(JSON.parse(turmasStorage));
    }
  }, []);

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

  return (
    <div className="container">
      <main className="form">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/*
            name*, saleStatus, template,
            installmentable, installments, installmentsValue, totalValue*,
            typeExpire*, expire*,
            class, time, weekdays
            */}

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
              <Select label="Parcelamento" name="installmentable">
                <option value="">Selecione</option>
                <option value="parcelavel">Parcelável</option>
                <option value="aVista">À vista</option>
              </Select>
              <Input
                label="Nº de parcelas"
                name="installments"
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
              <Select label="Tipo de Vencimento" name="typeExpire" required>
                <option value="">Selecione</option>
                <option value="porSecao">por Seção</option>
                <option value="porTempo">por Tempo</option>
              </Select>
              <Input
                label={expireLabel}
                name="expire"
                type="number"
                min={0}
                placeholder={expirePlaceHolder}
                disabled={typeExpire === ""}
                required
              />
            </div>

            <div className="block">
              <h3>Turma</h3>
              <Select label="Turma" name="class">
                <option value="">Escolha a Turma</option>
                {turmas.map((turma) => (
                  <option key={turma.nome} value={turma.nome}>
                    {turma.nome} : {turma.vagas}
                  </option>
                ))}
              </Select>
              <Input label="Horário" name="time" type="time" />
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

            <Button>Salvar</Button>
          </form>
        </FormProvider>
        <ToastContainer position="top-right" autoClose={3000} />
      </main>
    </div>
  );
};

export default RegisterContract;
