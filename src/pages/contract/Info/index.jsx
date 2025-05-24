import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../../components";
import "./styles.scss";

const InfoContract = () => {
  const { id } = useParams();
  const [selectedContract, setSelectedContract] = useState(null);

  useEffect(() => {
    const contracts = JSON.parse(localStorage.getItem("contratos")) || [];
    const foundContract = contracts.find((c) => String(c.id) === id);
    setSelectedContract(foundContract);
  }, [id]);

  return (
    <div className="container">
      {/*
      <div className="client-container">
        <div className="client-side">
          {selectedClient?.photo ? (
            <img src={selectedClient.photo} alt="Foto" className="photo-user" />
          ) : (
            <i className="bi bi-person-fill photo-user"></i>
          )}

          <p className="client-name">
            {selectedClient ? selectedClient.name : "Nome"}
          </p>
          <Button>Anexos</Button>
        </div>

        <div className="client-content">
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
            {selectedClient ? (
              <>
                <p>
                  <strong>Nome:</strong> {selectedClient.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedClient.email}
                </p>
                <p>
                  <strong>Telefone:</strong> {selectedClient.cellphone}
                </p>
                <p>
                  <strong>Data de nascimento:</strong>{" "}
                  {selectedClient.birthDate}
                </p>
                <p>
                  <strong>CPF:</strong> {selectedClient.cpf}
                </p>
                <p>
                  <strong>Endereço:</strong> {selectedClient.address}
                </p>
              </>
            ) : (
              "Dados"
            )}
          </div>
          <div className="box-info">
            {selectedClient ? (
              <>
                <p>
                  <strong>Contrato:</strong> {selectedClient.contrato}
                </p>
              </>
            ) : (
              "Informações do contrato"
            )}
          </div>
          <div className="box-info">
            {selectedClient ? (
              <>
                <p>
                  <strong>Observações:</strong> {selectedClient.additionalInfo}
                </p>
              </>
            ) : (
              "Campo de texto de observações"
            )}
          </div>

          <div className="edit">
            <Button>Editar</Button>
          </div>
        </div>
      </div>
      */}
    </div>
  );
};

export default InfoContract;
