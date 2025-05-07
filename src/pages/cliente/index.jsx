import React, { useState } from 'react';
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


  return (
    <div className="container">
      <div className="lista-container"></div>
      <main className="formulario">
        <form>
          <div className="bloco">
            <h3></h3>
            <label>
              Nome*: <input name="nome" />
            </label>
            <label>
              Data de nascimento*: <input type="date" name="dataNascimento" />
            </label>
            <label>
              Sexo*:
              <select name="sexo">
                <option value="">Selecione</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </select>
            </label>
            <label>
              CPF*: <input name="cpf" />
            </label>
          </div>

          <div className="bloco">
            <h3>Dados de contato</h3>
            <label>
              Email: <input name="email"/>
            </label>
          </div>

          <div className="bloco">
            <h3>Dados de Residência</h3>
            <label>
              CEP: <input name="cep"  />
            </label>
            <label>
              Endereço: <input value={cliente.endereco} />
            </label>
            <label>
              Bairro: <input value={cliente.bairro} />
            </label>
            <label>
              Cidade: <input value={cliente.cidade} />
            </label>
            <label>
              UF: <input value={cliente.uf} />
            </label>
            <label>
              Número: <input name="numero" />
            </label>
            <label>
              Complemento: <input name="complemento"/>
            </label>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Cadastro;