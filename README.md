# ▶️ Como rodar o projeto

Siga os passos abaixo para rodar o projeto localmente:

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

2. **Acesse a pasta do projeto**
```bash
cd front-end
```

3. **Instale as dependêcias**
```bash
npm install
```

4. **Inicie o servidor**
```bash
npm run dev
```

#### O projeto estará disponível em: http://localhost:5173

# Principais Dependências

## axios
Usado para fazer requisições HTTP. Ele ajuda a comunicar seu front-end com o back-end (ou APIs externas) para enviar e receber dados de forma simples e eficiente. Exemplo: 
```jsx
import axios from 'axios';

axios.get('/api/data')
  .then(response => console.log(response))
  .catch(error => console.error(error));
```

## react-icons
Biblioteca que fornece ícones populares em formato React, facilitando a inclusão de ícones nos componentes sem a necessidade de imagens ou SVGs externos. Exemplo:
```jsx
import { FaBeer } from 'react-icons/fa';

function App() {
  return <div><FaBeer /> Vamos beber uma cerveja!</div>;
}
```

## react-router-dom
Usado para gerenciar a navegação e as rotas dentro de um aplicativo React. Ele permite a criação de páginas com URLs específicas e navegação sem recarregar a página inteira. Exemplo:
```jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}
```

## react-toastify
Biblioteca para exibir notificações tipo toast, ou seja, mensagens temporárias que aparecem na tela, como erros, alertas ou sucessos. Ideal para melhorar a interação com o usuário sem interromper o fluxo. Exemplo:
```jsx
import { toast } from 'react-toastify';

function notify() {
  toast("Este é um aviso!");
}
```

## yup
Biblioteca para validação de dados, como formulários. Permite garantir que os dados inseridos pelo usuário atendem a critérios específicos (ex: email válido, senha forte). Exemplo:
```jsx
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required()
});
```

## sass
Pré-processador CSS que adiciona funcionalidades extras ao CSS, como variáveis, aninhamento de seletores e mixins, tornando o código mais organizado e reutilizável. Exemplo:

### CSS
```css
.button {
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
}

.button:hover {
  background-color: #2980b9;
}
```

### SASS/SCSS
```scss
$primary-color: #3498db;
$hover-color: #2980b9;

.button {
  background-color: $primary-color;
  color: white;
  padding: 10px 20px;

  &:hover {
    background-color: $hover-color;
  }
}
```