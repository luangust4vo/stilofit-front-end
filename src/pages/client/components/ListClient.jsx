import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClientService from "../../../services/ClientService";
import "./listClient.scss";

const ListClient = ({ onClientSelect }) => {
  const [expanded] = React.useState(false);
  const [filteredClients, setFilteredClients] = useState([]);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const limit = 30;
  const navigate = useNavigate();
  const clientService = new ClientService();

  const handleClientClick = (client) => {
    if (onClientSelect) onClientSelect(client);
    navigate(`/cliente/${client.id}`);
  };

  const goRegistration = () => {
    navigate("../cliente");
  };

  useEffect(() => {
    const fetchClients = async () => {
      let result = await clientService.findAll();
      if (search.trim() !== "") {
        result = result.filter((client) =>
          client.name.toLowerCase().includes(search.toLowerCase())
        );
      }
      result.sort((a, b) => {
        const nameA = a.name ? a.name.toLowerCase() : "";
        const nameB = b.name ? b.name.toLowerCase() : "";
        return nameA.localeCompare(nameB);
      });
      setFilteredClients(result);
      setOffset(0);
    };
    fetchClients();
  }, [search]);

  useEffect(() => {
    const scroller = document.querySelector(".scroller");
    if (!scroller) return;

    const handleScroll = () => {
      const isBottom =
        scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight;
      if (isBottom) {
        setOffset((prev) => prev + limit);
      }
    };

    scroller.addEventListener("scroll", handleScroll);
    return () => scroller.removeEventListener("scroll", handleScroll);
  }, [expanded]);

  const handleLoadMore = () => {
    setOffset((prev) => prev + limit);
  };

  return (
    <div className="sidebar">
      <button className="btn-bar">
        <i className="bi bi-list"></i>
      </button>
      <div className="top-bar">
        <div className="search-row">
          <input
            className="field-search"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="btn-icon">
          <i className="bi bi-funnel-fill"></i>
        </button>
        <button className="btn-icon" onClick={goRegistration}>
          <i className="bi-person-fill-add"></i>
        </button>
      </div>

      <div className="scroller">
        {filteredClients.slice(0, offset + limit).map((client) => (
          <div
            className="user"
            key={client.id}
            onClick={() => handleClientClick(client)}
          >
            {client.photo ? (
              <img className="icon-user" src={client.photo} alt="foto" />
            ) : (
              <i className="bi bi-person-fill icon-user"></i>
            )}
            <span className="username">{client.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListClient;
