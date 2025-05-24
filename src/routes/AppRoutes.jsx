import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register, Info, Layout } from "../pages/client";
import { RegisterContract, LayoutContract } from "../pages/contract";
// adicionar InfoContract posteriormente

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cliente" element={<Layout />}>
          <Route index element={<Register />} />
          <Route path=":id" element={<Info />} />
        </Route>
        <Route path="/contrato" element={<LayoutContract />}>
          <Route index element={<RegisterContract />} />
          {/* Adicionar InfoContract posteriormente */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
