import { useState, useEffect, useCallback } from "react";
import { Button } from "../../../components";
import Table from "../../../components/Table/Table";
//import PromotionModal from "../Register/index";
//import InfoPromotion from "../Info/index";
import PromotionService from "../../../services/PromotionService";
import "./promotionTable.scss";

function PromotionTable() {
  const [showModal, setShowModal] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedInfoId, setSelectedInfoId] = useState(null);

  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [size, setSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const promotionService = new PromotionService();

  const fetchPromotions = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await promotionService.findPaginated(
        currentPage,
        size,
        search
      );
      setData(response.content || []);
      setTotalElements(response.totalElements || 0);
    } catch (error) {
      console.error("Erro ao carregar promoções:", error);
      setData([]);
      setTotalElements(0);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, size, search]);

  useEffect(() => {
    fetchPromotions();
  }, [fetchPromotions]);

  const handleCadastroSucesso = () => {
    setShowModal(false);
    setIdEdit(null);
    fetchPromotions();
  };

  const handleOpenEditModal = (id) => {
    setIdEdit(id);
    setShowModal(true);
  };

  const tableHeaders = ["Nome", "Descrição", "Tipo", "Valor", "Aplicado", ""];

  const renderTableData = (element) => (
    <>
      <td className="truncate-text" style={{ textAlign: "center" }}>
        {element.name || "-"}
      </td>
      <td className="truncate-text">{element.description || "-"}</td>
      <td>
        {element.discountType === "PERCENTAGE"
          ? "Porcentagem"
          : element.discountType === "ABSOLUTE"
          ? "Absoluto"
          : "-"}
      </td>
      <td>
        {element.discountType === "PERCENTAGE"
          ? `${element.value}%`
          : element.discountType === "ABSOLUTE"
          ? `R$ ${element.value.toFixed(2)}`
          : "-"}
      </td>
      <td>{element.timesApplied || "-"}</td>

      <td className="buttons">
        <Button
          className="btn-icon-edit"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenEditModal(element.id);
          }}
          title="Editar"
        >
          <i className="bi bi-pencil-fill bi-cell"></i>
        </Button>
      </td>
    </>
  );

  return (
    <>
      <Table
        data={data}
        loading={isLoading}
        headerComponent={() => (
          <>
            <div className="header-left"></div>
            <div className="header-right">
              <input
                className="field-search"
                placeholder="Buscar por Nome..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(0);
                }}
              />
              <i className="bi bi-funnel-fill"></i>
              <Button
                className="btn-icon-table"
                onClick={() => {
                  setIdEdit(null);
                  setShowModal(true);
                }}
              >
                Novo +
              </Button>
            </div>
          </>
        )}
        headerCells={tableHeaders}
        getRowProps={({ element }) => ({
          onClick: () => {
            setSelectedInfoId(element.id);
            setShowInfoModal(true);
          },
          style: { cursor: "pointer" },
        })}
      >
        {renderTableData}
      </Table>

      {/* Adicione um componente de paginação aqui, se necessário, usando currentPage, size e totalElements */}
      {/* Ex: <Pagination currentPage={currentPage} totalElements={totalElements} onPageChange={setCurrentPage} /> */}

      {showModal &&
        {
          /*<PromotionModal
                    id={idEdit}
                    onClose={() => setShowModal(false)}
                    onSuccess={handleCadastroSucesso}
                />*/
        }}
      {showInfoModal && (
        <div className="center-modal-overlay-class">
          <div className="center-modal-content-class">
            {/*<InfoPromotion
                            id={selectedInfoId}
                            onClose={() => setShowInfoModal(false)}
                        />*/}
          </div>
        </div>
      )}
    </>
  );
}

export default PromotionTable;
