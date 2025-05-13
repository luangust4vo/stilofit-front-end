import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import './contract.scss';

const RegisterContract = () => {
  return (
    <div className="container">
      <div className="list-container">
        <p>Lista de clientes</p>
      </div>
      <main className="form">
        <h1>Olá</h1>
      </main>
    </div>
  );
};

export default RegisterContract;
