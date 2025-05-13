import React, { useState, useEffect } from 'react';
import './list.scss';

const List = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [clients, setClients] = React.useState([]);
  const [offset] = useState(0);

  const changeExpanded = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const storedClients = JSON.parse(localStorage.getItem('clientes')) || [];
    setClients(storedClients);
  }, [offset]);


  return (
    <div className={`sidebar ${expanded ? 'expanded' : ''}`}>
      <div className="top-bar">
        <button className="btn-icon" onClick={changeExpanded}>
          ☰
        </button>
        {expanded && <input className="field-search" placeholder="Buscar..." />}
      </div>

      {clients.map((client) => (
        <div className="user" key={client.id}>
          <div className="icon-user" />
          {expanded && <span>{client.name}</span>}
        </div>
      ))}
    </div>
  );
};

export default List;
