import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../../components";
import { LayoutMenu } from "../../../components/index.jsx";
import "./style.scss";

const InfoEmployee = () => {
  const { id } = useParams();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const employees = JSON.parse(localStorage.getItem("funcionarios")) || [];
    const foundEmployee = employees.find((c) => String(c.id) === id);
    setSelectedEmployee(foundEmployee);
  }, [id]);

  return (
    <LayoutMenu>
      <div className="container-employee-info">
        <Button onClick={() => navigate("/funcionario")}>
          <i className="bi bi-arrow-left"></i>
          Voltar
        </Button>
        {selectedEmployee ? (
          <>
            <p>
              <strong>Nome:</strong> {" " + selectedEmployee.nome}
            </p>
            <p>
              <strong>Email:</strong> {" " + selectedEmployee.email}
            </p>
            <p>
              <strong>Data de Nascimento:</strong>
              {" " + selectedEmployee.dataNascimento}
            </p>
            <p>
              <strong>Sexo:</strong>
              {" " + selectedEmployee.sexo}
            </p>
            <p>
              <strong>CPF:</strong>
              {" " + selectedEmployee.cpf}
            </p>
            <p>
              <strong>RG:</strong>
              {" " + selectedEmployee.registroProfissional}
            </p>
            <p>
              <strong>Registro Profissional:</strong>
              {" " + selectedEmployee.registroProfissional}
            </p>
            <p>
              <strong>Estado Civil:</strong>
              {" " + selectedEmployee.estadoCivil}
            </p>
            <p>
              <strong>Cargo:</strong>
              {" " + selectedEmployee.cargo}
            </p>
            <p>
              <strong>Status:</strong> {" " + selectedEmployee.status}
            </p>
            <p>
              <strong>Contrato:</strong> {" " + selectedEmployee.contrato}
            </p>
            <p>
              <strong>Endereço:</strong>
              {" " + selectedEmployee.endereco}
            </p>
            <p>
              <strong>Jornada:</strong>
              {" " + selectedEmployee.jornada}
            </p>
          </>
        ) : (
          "Nenhuma Informação encontrada"
        )}
      </div>
    </LayoutMenu>
  );
};

export default InfoEmployee;
