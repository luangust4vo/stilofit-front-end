import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {Button} from "../../../components"
import "./style.scss";

const InfoEmployee = ({ id: propId, onClose }) => {
  const params = useParams();
  const id = propId || params.id;
  const [selectedEmployee, setselectedEmployee] = useState(null);

  useEffect(() => {
    const contracts = JSON.parse(localStorage.getItem("contratos")) || [];
    const foundContract = contracts.find((c) => String(c.id) === id);
    setselectedEmployee(foundContract);
  }, [id]);

  const[cep, setCep] = useState("");  
  return (
    <div className="container-contract-info">
      <Button
        onClick={onClose}
      >
        <i className="bi bi-arrow-left"></i>
        Voltar
      </Button>
      {selectedEmployee ? (
        <>
          <p>
            <strong>Nome:</strong> {" " + selectedEmployee.name}
          </p>
          <p>
            <strong>Email:</strong> {" " + selectedEmployee.email}
          </p>
          <p>
            <strong>Senha:</strong> {" " + selectedEmployee.password}
          </p>
          <p>
            <strong>Data de Nascimento:</strong>
            {" " + selectedEmployee.birthDate}
          </p>
          <p>
            <strong>Sexo:</strong>{" "}
            {" " +
              Number(selectedEmployee.gender === "Masculino" ? 1 : 0) +
              (selectedEmployee.gender === "Masculino" ? "Masculino" : "Feminino")}
          </p>
          <p>
            <strong>CPF:</strong>
            {" " + selectedEmployee.expire}
            {selectedEmployee.typeExpire === "por Seção"
              ? " aulas"
              : selectedEmployee.typeExpire === "por Tempo"
                ? " meses"
                : ""}
          </p>
          <p>
            <strong>RG:</strong>
            {" " + selectedEmployee.classRoms}
          </p>
          <p>
            <strong>Registro Profissional:</strong>
            {" " + selectedEmployee.professionalRecord}
          </p>
          <p>
            <strong>Estado Civil:</strong>
            {" " + selectedEmployee.civilStatus}
          </p>
          <p>
            <strong>Cargo:</strong>
            {" " + selectedEmployee.role}
          </p>
          <p>
            <strong>Status:</strong>
            {" " + selectedEmployee.status}
            {selectedEmployee.status === "Ativo" ? (
              <span className="status-active">Ativo</span>
            ) : (
              <span className="status-inactive">Inativo</span>
            )}
          </p>
        </>
      ) : (
        "Nenhuma Informação encontrada"
      )}
    </div>
  );
};

export default InfoEmployee;
