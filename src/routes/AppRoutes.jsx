import { BrowserRouter, Routes } from "react-router-dom";
import CheckoutRoutes from "./CheckoutRoutes";
import ClientRoutes from "./ClientRoutes";
import ContractRoutes from "./ContractRoutes";
import ClassRoutes from "./ClassRoutes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {ClientRoutes()}
        {ContractRoutes()}
        {CheckoutRoutes()}
        {ClassRoutes()}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
