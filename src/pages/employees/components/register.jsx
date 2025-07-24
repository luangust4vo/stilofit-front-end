import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';  
import EmployeeForm from './EmployeeForm';
import EmployeeTable from './EmployeeTable';
import InfoEmployee from './InfoEmployee';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './styles.css';

const RegistroFuncionario = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleView = (id) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  return (
    <div className="container">
      <EmployeeForm onSubmit={handleCreate} />
      <EmployeeTable onView={handleView} />
      {modalOpen && <InfoEmployee id={selectedId} onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default RegistroFuncionario;
