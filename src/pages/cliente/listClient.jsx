import React, { useState, useEffect } from 'react';
import './listClient.scss';
import { useNavigate } from 'react-router-dom';

const List = ({ onClientSelect }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [clients, setClients] = React.useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(0);
  const limit = 30;
  const navigate = useNavigate();

  const handleClientClick = (client) => {
    if (onClientSelect) onClientSelect(client);
    navigate(`/cliente/${client.id}`);
  };

  const goRegistration = () => {
    navigate('../cadastro');
  };

  const changeExpanded = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const storedClients = JSON.parse(localStorage.getItem('clientes')) || [];
    const sortedClients = storedClients.sort((a, b) => a.name.localeCompare(b.name));
    const nextClients = sortedClients.slice(offset, offset + limit);
    setClients((prev) => {
      const ids = new Set(prev.map((c) => c.id));
      const newClients = nextClients.filter((c) => !ids.has(c.id));
      return [...prev, ...newClients];
    });
  }, [offset]);

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredClients(clients);
    } else {
      const result = clients.filter((client) =>
        client.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredClients(result);
    }
  }, [search, clients]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (bottom) {
        setOffset((prev) => prev + limit);
      }
    };

    if (expanded) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [expanded]);

  const handleLoadMore = () => {
    setOffset((prev) => prev + limit);
  };

  return (
    <div
      className={`sidebar ${expanded ? 'expanded' : ''}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="top-bar">
        <div className="search-row">
          {expanded && (
            <input
              className="field-search"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          )}
        </div>
        {expanded && (
          <button className="btn-icon">
            <i className="bi bi-funnel-fill"></i>
          </button>
        )}
        {expanded && (
          <button className="btn-icon" onClick={goRegistration}>
            <i className="bi-person-fill-add"></i>
          </button>
        )}
      </div>

      {(search ? filteredClients : clients).map((client) => (
        <div className="user" key={client.id} onClick={() => handleClientClick(client)}>
          {client.photo ? (
            <img className="icon-user" src={client.photo} alt="foto" />
          ) : (
            <i className="bi bi-person-fill icon-user"></i>
          )}
          {expanded && <span>{client.name}</span>}
        </div>
      ))}
    </div>
  );
};

export default List;
