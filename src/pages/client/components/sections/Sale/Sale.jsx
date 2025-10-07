import ContractService from "../../../../../services/ContractService";
import SaleService from "../../../../../services/SaleService";
import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import "./Sale.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sale = ({ clientId }) => {
  const contractService = useMemo(() => new SaleService(), []);
  const saleService = useMemo(() => new SaleService(), []);
  const [activeTab, setActiveTab] = useState("Contracts");
  const [entities, setEntities] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const scrollRef = useRef(null);

  const serviceMap = useMemo(
    () => ({
      Contracts: contractService,
      Products: false,
      Services: false,
    }),
    [contractService]
  );

  const fetchEntities = useCallback(
    async (pageToLoad) => {
      const service = serviceMap[activeTab];
      if (!service) return;
      if (pageToLoad > 0 && !hasMore) return;
      setIsLoading(true);
      try {
        const dataGeneral = await service.findPaginated(pageToLoad);
        const newContent = dataGeneral.content || [];
        const isLastPage = dataGeneral.last;
        setEntities((prev) =>
          pageToLoad === 0 ? newContent : [...prev, ...newContent]
        );
        setHasMore(!isLastPage);
      } catch (error) {
        console.error(
          `Erro ao carregar página ${pageToLoad} de ${activeTab}:`,
          error
        );
        toast.error(`Falha ao carregar dados. Verifique o console.`, {
          toastId: "load-error",
        });
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    },
    [activeTab, serviceMap, hasMore]
  );

  useEffect(() => {
    setEntities([]);
    setPage(0);
    setHasMore(true);
    setSelectedEntity(null);
    setSearchTerm("");
    fetchEntities(0);
  }, [activeTab, serviceMap]);

  useEffect(() => {
    if (page > 0) {
      fetchEntities(page);
    }
  }, [page, fetchEntities]);

  useEffect(() => {
    const currentRef = scrollRef.current;
    if (!currentRef || !serviceMap[activeTab]) return;
    const handleScroll = () => {
      const isBottom =
        currentRef.scrollHeight -
          currentRef.scrollTop -
          currentRef.clientHeight <
        100;
      if (isBottom && hasMore && !isLoading) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    currentRef.addEventListener("scroll", handleScroll);
    return () => {
      currentRef.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, hasMore, activeTab, serviceMap]);

  const filteredEntities = useMemo(() => {
    if (!searchTerm) {
      return entities;
    }
    const lowerCaseSearch = searchTerm.toLowerCase();
    return entities.filter(
      (entity) =>
        entity.name && entity.name.toLowerCase().includes(lowerCaseSearch)
    );
  }, [entities, searchTerm]);

  const handleSell = useCallback(async () => {
    if (!selectedEntity) {
      toast.warn("Selecione um item para realizar a venda.");
      return;
    }
    const saleData = {
      clientId: clientId,
      contractsIds: [],
      totalAmount: selectedEntity.totalValue || 1, // x
    };
    switch (activeTab) {
      case "Contracts":
        saleData.contractsIds.push(selectedEntity.id);
        break;
      default:
        console.warn(`Aba ativa desconhecida: ${activeTab}`);
        toast.error("Tipo de entidade não reconhecido para a venda.");
        return;
    }
    const payload = Object.fromEntries(
      Object.entries(saleData).map(([key, value]) => [
        key,
        value === "" ? null : value,
      ])
    );
    try {
      console.log(payload);
      await saleService.create(payload);
      setSelectedEntity(null);
      toast.success(
        `Venda de ${selectedEntity.name} realizada para o Cliente (ID): ${clientId}!`
      );
    } catch (error) {
      toast.error("Falha na venda. Verifique a conexão ou os dados.");
    }
  }, [selectedEntity, clientId, activeTab, saleService]);

  const TabButton = ({ tab, name }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`tab-button ${activeTab === tab ? "active" : ""}`}
    >
      {name}
    </button>
  );

  let emptyMessage;
  if (isLoading && entities.length === 0) {
    emptyMessage = (
      <div className="empty-message">Carregando {activeTab}...</div>
    );
  } else if (!serviceMap[activeTab]) {
    emptyMessage = (
      <div className="empty-message">A aba {activeTab} está desativada.</div>
    );
  } else if (searchTerm && filteredEntities.length === 0) {
    emptyMessage = (
      <div className="empty-message">
        Nenhum resultado encontrado para "{searchTerm}".
      </div>
    );
  } else if (entities.length === 0 && !isLoading && !hasMore) {
    emptyMessage = (
      <div className="empty-message">
        Nenhum {activeTab.toLowerCase().slice(0, -1)} encontrado.
      </div>
    );
  }

  return (
    <div className="sale-container">
      <div className="tab-bar">
        <TabButton tab="Contracts" name="Contratos" />
        <TabButton tab="Products" name="Produtos" />
        <TabButton tab="Services" name="Serviços" />
      </div>

      <div className="sale-content">
        <input
          type="text"
          placeholder={`Buscar ${activeTab} por nome...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={!serviceMap[activeTab]}
          className="search-input"
        />

        <div ref={scrollRef} className="entity-list-container">
          {filteredEntities.length === 0 && !isLoading ? ( // ...
            emptyMessage
          ) : (
            <>
              {filteredEntities.map((entity) => (
                <div
                  key={`${activeTab}-${entity.id}`}
                  className={`entity-item 
                        ${
                          selectedEntity && selectedEntity.id === entity.id
                            ? "selected"
                            : ""
                        }`}
                  onClick={() => setSelectedEntity(entity)}
                >
                  <span>{entity.id}</span>
                  {/*<span>{entity.name}</span>
                  <span>R$ {entity.totalValue.toFixed(2).replace(".", ",")}</span>*/}
                </div>
              ))}
            </>
          )}
        </div>

        <div className="button-div">
          <button
            onClick={handleSell}
            disabled={!selectedEntity}
            className="sell-button"
          >
            Realizar Venda
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sale;
