import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/Table/Table";
import { goRegistration, goEdit } from "../../../components/Table/Table";
import { GenericContextProvider } from "../../../contexts/GenericContext";
import InfoContract from "../infoClass";
import { Button } from "../../../components";

import "./ListClass.scss";

function ListClass() {
  const navigate = useNavigate();
  const routeName = "ListClass";
  const [turmas, setTurmas] = useState([]);
  useEffect(() => {
    const turmasSalvas = JSON.parse(localStorage.getItem("turmas")) || [];
    setTurmas(turmasSalvas);
  }, []);
  return (
    <GenericContextProvider lSName="ListClass" data={turmas}>
      <Table
        headerComponent={({ search, setSearch }) => (
          <>
            <div className="header-left"></div>
            <div className="header-right">
              <input
                className="field-search"
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <i className="bi bi-funnel-fill"></i>
              <Button
                className="btn-icon-table"
                onClick={() => navigate("/turma/nova")}
              >
                Criar Turma
                <i className="bi-plus"></i>
              </Button>
            </div>
          </>
        )}
        headerCells={[
          "Nome da Turma",
          "Local",
          "Vagas",
          "Duração",
          "Observações",
          "",
        ]}
        getRowProps={({ element, setSelectedId }) => ({
          onClick: () => {
            setSelectedId(element.id);
          },
          style: { cursor: "pointer" },
        })}
        visualize={({ selectedId, setSelectedId }) =>
          selectedId !== null && (
            <div className="modal-overlay">
              <div className="modal-content">
                <InfoContract
                  id={selectedId}
                  onClose={() => setSelectedId(null)}
                />
              </div>
            </div>
          )
        }
        data={turmas}
      >
        {(element) => (
          <>
             <td>{element.turma}</td>
            <td>{element.local}</td>
            <td>{element.vagas}</td>
            <td>{element.tempo}</td>
            <td>{element.observacoes || "-"}</td>
            <td className="buttons">
              <Button
                className="btn-icon-edit"
                onClick={(e) => {
                  e.stopPropagation();
                  goEdit(navigate, routeName, element.id); 
                }}
                title="Editar"
              >
                <i className="bi bi-pencil-fill bi-cell"></i>
              </Button>
            </td>
          </>
        )}
      </Table>
    </GenericContextProvider>
  );
}

export default ListClass;
