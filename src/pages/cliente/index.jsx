import React, { useState } from 'react';
import validationSchema from '../../utils/validation';
import { fetchAddressByCEP } from '../../utils/cep';
import './index.scss';

const Cadastro = () => {
  const [client, setClient] = useState({
    name: '',
    birthDate: '',
    gender: '',
    cpf: '',
    rg: '',
    maritalStatus: '',
    medicalExamDueDate: '',
    email: '',
    guardianName: '',
    guardianCpf: '',
    guardianPhone: '',
    emergencyContact: '',
    emergencyPhone: '',
    notes: '',
    contactMethods: '',
    cep: '',
    addressType: '',
    address: '',
    district: '',
    city: '',
    state: '',
    number: '',
    complement: '',
    additionalInfo: '',
    consultant: '',
  });

  const [editableFields, setEditableFields] = useState({
    address: true,
    district: true,
    city: true,
    state: true,
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const buscarEndereco = async () => {
    const cep = client.cep.replace(/\D/g, '');
    if (cep.length === 8) {
      const data = await fetchAddressByCEP(cep);
      if (data) {
        setClient((prev) => ({
          ...prev,
          address: data.logradouro || '',
          district: data.bairro || '',
          city: data.localidade || '',
          state: data.uf || '',
        }));
        setEditableFields({
            address: false,
            district: false,
            city: false,
            state: false,
          });
        } else {
          setEditableFields({
            address: true,
            district: true,
            city: true,
            state: true,
          });

      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(client, { abortEarly: false });

      const clients = JSON.parse(localStorage.getItem('clientes')) || [];
      const newClient = { ...client, id: crypto.randomUUID() };
      localStorage.setItem('clientes', JSON.stringify([...clients, newClient]));
      alert('Cliente cadastrado!');
    } catch (error) {
      if (error.inner) {
        const msg = error.inner.map((err) => err.message).join('\n');
        alert(msg);
      } else {
        alert('Erro ao validar dados!');
      }
    }
  };


  return (
    <div className="container">
      <div className="list-container">
        <p>Lista de clientes</p>
      </div>
      <main className="form">
        <form onSubmit={handleSubmit}>
          <div className="block">
            <h3>Dados do Cliente</h3>
            <label>
              Nome*: <input name="name" onChange={handleChange} />
            </label>
            <label>
              Email: <input name="email" onChange={handleChange} />
            </label>
            <label>
              Data de nascimento*:{' '}
              <input type="date" name="birthDate" onChange={handleChange} />
            </label>
            <label>
              Sexo*:
              <select name="gender" onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </select>
            </label>
            <label>
              CPF*: <input name="cpf" onChange={handleChange} />
            </label>
            <label>
              RG: <input name="rg" onChange={handleChange} />
            </label>
            <label>
              Estado Civil: <input name="maritalStatus" onChange={handleChange} />
            </label>
            <label>
              Vencimento Exame Médico:{' '}
              <input type="date" name="medicalExamDueDate" onChange={handleChange} />
            </label>
          </div>

          <div className="block">
            <h3>Responsável pelo cliente</h3>
            <label>
              Nome: <input name="guardianName" onChange={handleChange} />
            </label>
            <label>
              CPF: <input name="guardianCpf" onChange={handleChange} />
            </label>
            <label>
              Telefone: <input name="guardianPhone" onChange={handleChange} />
            </label>
          </div>

          <div className="block">
            <h3>Dados de emergência</h3>
            <label>
              Nome do Contato: <input name="emergencyContact" onChange={handleChange} />
            </label>
            <label>
              Telefone: <input name="emergencyPhone" onChange={handleChange} />
            </label>
            <label>
              Observações: <textarea name="notes" onChange={handleChange} />
            </label>
          </div>

          <div className="block">
            <h3>Dados de contato</h3>
            <label>
              Formas de contato: <input name="contactMethods" onChange={handleChange} />
            </label>
          </div>

          <div className="block">
            <h3>Dados de Residência</h3>
            <label>
              Tipo:
              <select name="addressType" onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="Residential">Residencial</option>
                <option value="Commercial">Comercial</option>
              </select>
            </label>
            <label>
              CEP: <input name="cep" onBlur={buscarEndereco} onChange={handleChange} />
            </label>
            <label>
              Endereço:
              <input
                name="address"
                value={client.address}
                onChange={handleChange}
                disabled={!editableFields.address}
              />
            </label>
            <label>
              Bairro:
              <input
                name="district"
                value={client.district}
                onChange={handleChange}
                disabled={!editableFields.district}
              />
            </label>
            <label>
              Cidade:
              <input
                name="city"
                value={client.city}
                onChange={handleChange}
                disabled={!editableFields.city}
              />
            </label>
            <label>
              UF:
              <input
                name="state"
                value={client.state}
                onChange={handleChange}
                disabled={!editableFields.state}
              />
            </label>

            <label>
              Número: <input name="number" onChange={handleChange} />
            </label>
            <label>
              Complemento: <input name="complement" onChange={handleChange} />
            </label>
          </div>

          <div className="block">
            <h3>Informações Adicionais</h3>
            <label>
              <textarea name="additionalInfo" onChange={handleChange} />
            </label>
          </div>

          <div className="block">
            <h3>Responsabilidade</h3>
            <label>
              Consultor: <input name="consultant" onChange={handleChange} />
            </label>
          </div>
          <button className='btn'>Salvar</button>
        </form>
      </main>
    </div>
  );
};

export default Cadastro;
