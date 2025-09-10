import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../../components";
import { useGenericContext } from "../../../contexts/GenericContext";
import "./styles.scss";

const InfoTurma = ({ id: propId, onClose }) => {
  const params = useParams();
  const id = propId || params.id;
  const [selectedClass, setSelectedClass] = useState(null);
  const { getStorageObjectById } = useGenericContext();

  useEffect(() => {
    const found = getStorageObjectById(id);
    setSelectedClass(found);
  }, [id, getStorageObjectById]);

  return (
    <div className="info-class">
      <h2>Detalhes da Turma</h2>

      {selectedClass ? (
        <>
          <p>
            <strong>Turma:</strong> {selectedClass.turma}
          </p>
          <p>
            <strong>Vagas:</strong> {selectedClass.vagas}
          </p>
          <p>
            <strong>Duração:</strong> {selectedClass.tempo}
          </p>
          <p>
            <strong>Local:</strong> {selectedClass.local}
          </p>
          <p>
            <strong>Observações:</strong> {selectedClass.observacoes}
          </p>
          <div className="color-info">
            <p>
              <strong>Cor:</strong>
            </p>
            <div
              className="color-box"
              style={{ backgroundColor: selectedClass.cor }}
            ></div>
          </div>
        </>
      ) : (
        "Nenhuma Informação encontrada"
      )}

      <Button onClick={onClose}>Fechar</Button>
    </div>
  );
};

export default InfoTurma;
