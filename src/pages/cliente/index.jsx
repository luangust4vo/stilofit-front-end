import React, { useState } from 'react';
import './index.scss';
const Cadastro = () => {
  const [cliente, setCliente] = useState({
    nome: '',
    dataNascimento: '',
    sexo: '',
    cpf: '',
    rg: '',
    estadoCivil: '',
    vencimenteExameMed: '',
    email: '',
    nomeResponsavel: '',
    cpfResponsavel: '',
    telefoneResponsavel: '',
    contatoEmergencia: '',
    telefoneEmergencia: '',
    observacoes: '',
    contatos: '',
    cep: '',
    tipoEndereco: '',
    endereco: '',
    bairro: '',
    cidade: '',
    uf: '',
    numero: '',
    complemento: '',
    informacoes: '',
    consultor: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const obrigatorios = ['nome', 'dataNascimento', 'sexo', 'cpf'];
    const faltando = obrigatorios.find((campo) => !cliente[campo]);
    if (faltando) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }
    if (!validarCPF(cliente.cpf)) {
      alert('CPF inválido!');
      return;
    }
    if (cliente.email && !validarEmail(cliente.email)) {
      alert('Email inválido!');
      return;
    }
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const novoCliente = { ...cliente, id: crypto.randomUUID() };
    localStorage.setItem('clientes', JSON.stringify([...clientes, novoCliente]));
    alert('Cliente cadastrado!');
  };

  const buscarEndereco = async () => {
    const cep = cliente.cep.replace(/\D/g, '');
    if (cep.length === 8) {
      const res = await fetch(`https://viacep.com.br/ws/${cliente.cep}/json/`);
      const dados = await res.json();
      if (!dados.erro) {
        setCliente((prev) => ({
          ...prev,
          endereco: dados.logradouro,
          bairro: dados.bairro,
          cidade: dados.localidade,
          uf: dados.uf,
        }));
      }
    }
  };

  function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;
    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf[10]);
  }

  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  return (
    <div className="container">
      <div className="lista-container"><p>Lista de clientes</p></div>
      <main className="formulario">
        <form onSubmit={handleSubmit}>
          <div className="bloco">
            <h3>Dados do Cliente</h3>
            <label>
              Nome*: <input name="nome" onChange={handleChange} />
            </label>
            <label>
              Email: <input name="email" onChange={handleChange} />
            </label>
            <label>
              Data de nascimento*:{' '}
              <input type="date" name="dataNascimento" onChange={handleChange} />
            </label>
            <label>
              Sexo*:
              <select name="sexo" onChange={handleChange}>
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
              Estado Civil: <input name="estadoCivil" onChange={handleChange} />
            </label>
            <label>
              Vencimento Exame Médico:{' '}
              <input type="date" name="vencimentoExameMed" onChange={handleChange} />
            </label>
          </div>

          <div className="bloco">
            <h3>Responsável pelo cliente</h3>
            <label>
              Nome: <input name="nomeResponsavel" onChange={handleChange} />
            </label>
            <label>
              CPF: <input name="cpfResponsavel" onChange={handleChange} />
            </label>
            <label>
              Telefone: <input name="telefoneResponsavel" onChange={handleChange} />
            </label>
          </div>

          <div className="bloco">
            <h3>Dados de emergência</h3>
            <label>
              Nome do Contato: <input name="contatoEmergencia" onChange={handleChange} />
            </label>
            <label>
              Telefone: <input name="telefoneEmergencia" onChange={handleChange} />
            </label>
            <label>
              Observações: <textarea name="observacoes" onChange={handleChange} />
            </label>
          </div>

          <div className="bloco">
            <h3>Dados de contato</h3>
            <label>
              Formas de contato: <input name="contatos" onChange={handleChange} />
            </label>
          </div>

          <div className="bloco">
            <h3>Dados de Residência</h3>
            <label>
              Tipo:
              <select name="tipoEndereco" onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="Residencial">Residencial</option>
                <option value="Comercial">Comercial</option>
              </select>
            </label>
            <label>
              CEP: <input name="cep" onBlur={buscarEndereco} onChange={handleChange} />
            </label>
            <label>
              Endereço: <input value={cliente.endereco} disabled />
            </label>
            <label>
              Bairro: <input value={cliente.bairro} disabled />
            </label>
            <label>
              Cidade: <input value={cliente.cidade} disabled />
            </label>
            <label>
              UF: <input value={cliente.uf} disabled />
            </label>
            <label>
              Número: <input name="numero" onChange={handleChange} />
            </label>
            <label>
              Complemento: <input name="complemento" onChange={handleChange} />
            </label>
          </div>

          <div className="bloco">
            <h3>Informações Adicionais</h3>
            <label>
              <textarea name="informacoes" onChange={handleChange} />
            </label>
          </div>

          <div className="bloco">
            <h3>Responsabilidade</h3>
            <label>
              Consultor: <input name="consultor" onChange={handleChange} />
            </label>
          </div>
          <button className="btn-salvar" type="submit">
            Salvar
          </button>
        </form>
      </main>
    </div>
  );
};

export default Cadastro;
