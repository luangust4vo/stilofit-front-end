import React, { useEffect, useState } from "react";
import { Button } from "../../../components";
import Formulario from "../index"; // Importa o modal de cadastro
import "./ListClass.scss";

const ListClass = () => {
  const [turmas, setTurmas] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredTurmas, setFilteredTurmas] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const turmasStorage = JSON.parse(localStorage.getItem("turmas")) || [];
    setTurmas(turmasStorage);
  }, [openModal]); // Atualiza lista ao fechar modal

  useEffect(() => {
    let result = [...turmas];
    if (search.trim() !== "") {
      result = result.filter((turma) =>
        turma.turma.toLowerCase().includes(search.toLowerCase())
      );
    }
    result.sort((a, b) => a.turma.localeCompare(b.turma, "pt-BR"));
    setFilteredTurmas(result);
  }, [search, turmas]);

  return (
    <div className="class-table-container">
      <div className="table-header">
        <input
          className="field-search"
          placeholder="Buscar turma..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={() => setOpenModal(true)}>Nova Turma</Button>
      </div>
      <table className="class-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Vagas</th>
            <th>Duração</th>
            <th>Local</th>
            <th>Cor</th>
            <th>Observações</th>
          </tr>
        </thead>
        <tbody>
          {filteredTurmas.length > 0 ? (
            filteredTurmas.map((turma, idx) => (
              <tr key={idx}>
                <td>{turma.turma}</td>
                <td>{turma.vagas}</td>
                <td>{turma.tempo}</td>
                <td>{turma.local}</td>
                <td>
                  <span style={{
                    display: "inline-block",
                    width: 20,
                    height: 20,
                    background: turma.cor,
                    borderRadius: "50%",
                    border: "1px solid #ccc"
                  }} />
                </td>
                <td>{turma.observacoes}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                Nenhuma turma encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {openModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <Formulario />
            <Button onClick={() => setOpenModal(false)}>Fechar</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListClass;