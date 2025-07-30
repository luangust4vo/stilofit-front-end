import { BrowserRouter, Routes } from "react-router-dom";
import CheckoutRoutes from "./CheckoutRoutes";
import ClientRoutes from "./ClientRoutes";
import ContractRoutes from "./ContractRoutes";
import ClassRoutes from "./ClassRoutes";
import AuthRoutes from "./AuthRoutes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {ClientRoutes()}
        {ContractRoutes()}
        {CheckoutRoutes()}
        {ClassRoutes()}
        {AuthRoutes()}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
