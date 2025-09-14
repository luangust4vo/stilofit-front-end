import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../../components";
import "./styles.scss";

const InfoContract = ({ id: propId, onClose }) => {
  const params = useParams();
  const id = propId || params.id;
  const [selectedContract, setSelectedContract] = useState(null);
  const [classRomsNames, setClassRomsNames] = useState([]);

  useEffect(() => {
    const contracts = JSON.parse(localStorage.getItem("contratos")) || [];
    const foundContract = contracts.find((c) => String(c.id) === id);
    setSelectedContract(foundContract);

    if (foundContract && foundContract.classRoms) {
      const selectedClassRomsIds = foundContract.classRoms;
      if (selectedClassRomsIds.length > 0) {
        const storedTurmas = localStorage.getItem("turmas");
        if (storedTurmas) {
          try {
            const turmasArray = JSON.parse(storedTurmas);
            const foundNames = selectedClassRomsIds
              .map((id) => {
                const foundTurma = turmasArray.find((turma) => turma.id === id);
                return foundTurma ? foundTurma.turma : null;
              })
              .filter((name) => name !== null);
            setClassRomsNames(foundNames);
          } catch (error) {
            console.error("Erro ao analisar dados do localStorage:", error);
            setClassRomsNames([]);
          }
        } else {
          setClassRomsNames([]);
        }
      } else {
        setClassRomsNames([]);
      }
    } else {
      setClassRomsNames([]);
    }
  }, [id]);

  if (!selectedContract) {
    return <div>Contrato não encontrado.</div>;
  }

  return (
    <div className="container-contract-info">
      <Button onClick={onClose}>
        <i className="bi bi-arrow-left"></i>
        Voltar
      </Button>
      {selectedContract ? (
        <>
          <p>
            <strong>Nome:</strong> {" " + selectedContract.name}
          </p>
          <p>
            <strong>Status:</strong> {" " + selectedContract.status}
          </p>
          <p>
            <strong>Template:</strong>{" "}
            {selectedContract.template ? selectedContract.template : "-"}
          </p>
          <p>
            <strong>Forma de Parcelamento:</strong>{" "}
            {selectedContract.installmentable
              ? selectedContract.installmentable
              : "-"}
          </p>
          {selectedContract.installmentable === "Parcelável" ? (
            <p>
              <strong>Número de Parcelas:</strong>{" "}
              {selectedContract.installments
                ? selectedContract.installments
                : "-"}
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
            <strong>Turmas:</strong>{" "}
            {classRomsNames && classRomsNames.length > 0
              ? classRomsNames.join(", ")
              : "-"}
          </p>
          <p>
            <strong>Horário de Entrada:</strong>
            {" " + selectedContract.timeMin + " - " + selectedContract.timeMax}
          </p>
          <p>
            <strong>Dias da Semana:</strong>{" "}
            {selectedContract.weekdays && selectedContract.weekdays.length > 0
              ? classRomsNames.join(", ")
              : "-"}
          </p>
        </>
      ) : (
        "Nenhuma Informação encontrada"
      )}
    </div>
  );
};

export default InfoContract;
