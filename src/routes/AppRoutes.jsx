import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register, Info, Layout } from '../pages/client';
import Turma from '../pages/turma'; 

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cliente" element={<Layout />}>
          <Route index element={<Register />} />
          <Route path=":id" element={<Info />} />
        </Route>
        <Route path="/turma" element={<Turma />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
