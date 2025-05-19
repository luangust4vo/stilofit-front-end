import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register, DataCustomer } from './pages'

// Aqui você pode adicionar as rotas do seu projeto
// Você também pode adicionar rotas aninhadas e, se quiser, até dividir elas em arquivos diferentes
// Exemplo: clientRoutes.js, adminRoutes.js, etc. Ai faz a importação e exporta tudo aqui
const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="cliente" element={<Register />} />
                <Route path="/cliente/:id" element={<DataCustomer />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;