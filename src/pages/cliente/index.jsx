import React, {useState } from 'react';
const Cadastro = () => {
  const [cliente, setCliente] = useState({
    nome: '',
    dataNascimento: '',
    sexo: '',
    cpf: '',
    email: '',
    cep: '',
    endereco: '',
    bairro: '',
    cidade: '',
    uf: '',
    numero: '',
    complemento: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cliente cadastrado!")
  };

  return (
    <div className="container">
      <div className="lista-container"></div>
      <main className="formulario">
        <form onSubmit={handleSubmit}>
          <div className="bloco">
            <h3></h3>
            <label>
              Nome*: <input name="nome" onChange={handleChange}/>
            </label>
            <label>
              Data de nascimento*: <input type="date" name="dataNascimento" onChange={handleChange}/>
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
              CPF*: <input name="cpf" onChange={handleChange}/>
            </label>
          </div>

          <div className="bloco">
            <h3>Dados de contato</h3>
            <label>
              Email: <input name="email" onChange={handleChange}/>
            </label>
          </div>

          <div className="bloco">
            <h3>Dados de Residência</h3>
            <label>
              CEP: <input name="cep" onChange={handleChange}/>
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
              Número: <input name="numero" onChange={handleChange}/>
            </label>
            <label>
              Complemento: <input name="complemento" onChange={handleChange}/>
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
