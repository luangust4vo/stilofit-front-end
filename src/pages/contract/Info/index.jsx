import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../../components";
import "./styles.scss";

const InfoContract = () => {
  const { id } = useParams();
  const [selectedContract, setSelectedContract] = useState(null);
  const navigate = useNavigate();

  const goEdit = () => {
    navigate(`/contrato/${id}/editar`);
  };

  useEffect(() => {
    const contracts = JSON.parse(localStorage.getItem("contratos")) || [];
    const foundContract = contracts.find((c) => String(c.id) === id);
    setSelectedContract(foundContract);
  }, [id]);

  return (
    <div className="container">
      <div className="contract-container">
        <div className="contract-side">
          <i className="bi bi-file-earmark-text-fill  photo-contract"></i>

          <p className="contract-name">
            {selectedContract ? selectedContract.name : "Nome"}
          </p>
          <Button>Anexos</Button>
        </div>

        <div className="contract-content">
          <div className="tabs">
            <Button>Status</Button>
            <Button>Dados</Button>
            <Button>Venda</Button>
            <Button>Pagamento</Button>
            <Button>Contrato</Button>
            <Button>Turma</Button>
            <Button>Treino</Button>
            <Button>Avaliação</Button>
          </div>

          <div className="box-info">
            {selectedContract ? (
              <>
                <p>
                  <strong>Nome:</strong> {" " + selectedContract.name}
                </p>
                <p>
                  <strong>Status:</strong> {" " + selectedContract.status}
                </p>
                <p>
                  <strong>Template:</strong> {" " + selectedContract.template}
                </p>
                <p>
                  <strong>Forma de Parcelamento:</strong>
                  {" " + selectedContract.installmentable}
                </p>
                {selectedContract.installmentable === "Parcelável" ? (
                  <p>
                    <strong>Número de Parcelas:</strong>
                    {" " + selectedContract.installments}
                  </p>
                ) : (
                  ""
                )}
                <p>
                  <strong>Valor Total:</strong>{" "}
                  {" R$ " +
                    Number(selectedContract.totalValue)
                      .toFixed(2)
                      .replace(".", ",")}{" "}
                </p>
                <p>
                  <strong>Vencimento:</strong>
                  {" " + selectedContract.expire}
                  {selectedContract.typeExpire === "por Seção"
                    ? " aulas"
                    : selectedContract.typeExpire === "por Tempo"
                      ? " meses"
                      : ""}
                </p>
                <p>
                  <strong>Turmas:</strong>
                  {" " + selectedContract.classRoms}
                </p>
                <p>
                  <strong>Horário de Entrada:</strong>
                  {" " +
                    selectedContract.timeMin +
                    " - " +
                    selectedContract.timeMax}
                </p>
                <p>
                  <strong>Dias da Semana:</strong>
                  {" " + selectedContract.weekdays}
                </p>
              </>
            ) : (
              "Dados"
            )}
          </div>

          <div className="edit">
            <Button onClick={goEdit}>Editar</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoContract;
