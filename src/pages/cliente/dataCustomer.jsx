import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import ListClient from './listClient';
import Button from '../../components/button';
import './dataCustomer.scss';

const DataCustomer = () => {
  const { id } = useParams();
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    const clients = JSON.parse(localStorage.getItem('clientes')) || [];
    const foundClient = clients.find((c) => String(c.id) === id);
    setSelectedClient(foundClient);
  }, [id]);

  return (
    <div className="container">
      <div className="list-container">
        <ListClient onClientSelect={setSelectedClient} />
      </div>

      <div className="client-container">
        <div className="client-lateral">
          <Button className='btn'>Status</Button>
          <img src={selectedClient?.photo || ''} alt="Foto" className="photo-user" />
          <p className="client-name">{selectedClient ? selectedClient.name : 'Nome'}</p>
          <Button>Anexos</Button>
        </div>

        <div className="client-conteudo">
          <div className="abas">
            <Button>Dados</Button>
            <Button>Venda</Button>
            <Button>Pagamento</Button>
            <Button>Contrato</Button>
            <Button>Turma</Button>
            <Button>Treino</Button>
            <Button>Avaliação</Button>
          </div>

          <div className="box-info">
            {selectedClient ? (
              <>
                <p>
                  <strong>Nome:</strong> {selectedClient.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedClient.email}
                </p>
                <p>
                  <strong>Telefone:</strong> {selectedClient.cellphone}
                </p>
                <p>
                  <strong>Data de nascimento:</strong> {selectedClient.birthDate}
                </p>
                <p>
                  <strong>CPF:</strong> {selectedClient.cpf}
                </p>
                <p>
                  <strong>Endereço:</strong> {selectedClient.address}
                </p>
              </>
            ) : (
              'Dados'
            )}
          </div>
          <div className="box-info">
            {selectedClient ? (
              <>
                <p>
                  <strong>Contrato:</strong> {selectedClient.contrato}
                </p>
              </>
            ) : (
              'Informações do contrato'
            )}
          </div>
          <div className="box-info">
            {selectedClient ? (
              <>
                <p>
                  <strong>Observações:</strong> {selectedClient.additionalInfo}
                </p>
              </>
            ) : (
              'Campo de texto de observações'
            )}
          </div>

          <div className="edit">
            <Button>Editar</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCustomer;
