import { BrowserRouter, Routes } from "react-router-dom";
import CheckoutRoutes from "./CheckoutRoutes";
import ClientRoutes from "./ClientRoutes";
import ContractRoutes from "./ContractRoutes";
import ClassRoutes from "./ClassRoutes";
import EmployeesRoutes from "./EmployeesRoute";
import LoginRoutes from "./LoginRoutes";
import EmployeeRoutes from "./EmployeeRoutes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {ClientRoutes()}
        {ContractRoutes()}
        {CheckoutRoutes()}
        {ClassRoutes()}
        {EmployeesRoutes()}
        {LoginRoutes()}
        {EmployeeRoutes()}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
