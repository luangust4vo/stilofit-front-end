import React, { useState, useEffect } from 'react';
import './listClient.scss';

const List = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [clients, setClients] = React.useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 30;

  const changeExpanded = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const storedClients = JSON.parse(localStorage.getItem('clientes')) || [];
    const sortedClients = storedClients.sort((a, b) => a.name.localeCompare(b.name));
    const nextClients = sortedClients.slice(offset, offset + limit);
    setClients((prev) => [...prev, ...nextClients]);
  }, [offset]);

  const handleLoadMore = () => {
    setOffset((prev) => prev + limit);
  };

  return (
    <div className={`sidebar ${expanded ? 'expanded' : ''}`}>
      <div className="top-bar">
        <button className="btn-icon" onClick={changeExpanded}>
          ☰
        </button>
        {expanded && <input className="field-search" placeholder="Buscar..." />}
        {expanded && <button className="btn-icon">F</button>}
        {expanded && <button className="btn-icon">+</button>}
      </div>

      {clients.map((client) => (
        <div className="user" key={client.id}>
          
          <img className= "icon-user" src="" alt="foto" />
          {expanded && <span>{client.name}</span>}
        </div>
      ))}
      {expanded && (
        <button className="btn-icon" onClick={handleLoadMore}>
          Carregar mais
        </button>
      )}
    </div>
  );
};

export default List;
