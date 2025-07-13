import { BrowserRouter, Routes } from "react-router-dom";
import CheckoutTable from "../pages/checkout/Movement/CheckoutTable";
import ClientRoutes from "./ClientRoutes";
import ContractRoutes from "./ContractRoutes";
import ClassRoutes from "./ClassRoutes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <ClientRoutes />
        <ContractRoutes />
        <CheckoutTable />
        <ClassRoutes />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
