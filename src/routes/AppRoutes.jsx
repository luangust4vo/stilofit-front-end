import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register, Info, Layout } from "../pages/client";
import { RegisterContract, LayoutContract, InfoContract } from "../pages/contract";

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
          <Route path=":id" element={<InfoContract />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
