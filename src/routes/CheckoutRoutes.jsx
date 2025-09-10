import { Route, Outlet } from "react-router-dom";
import { LayoutMenu } from "../components/index.jsx";
import CheckoutTableHistory from "../pages/checkout/History/HistoryCheckout";
import CheckoutTable from "../pages/checkout/Movement/CheckoutTable";

const CheckoutRoutes = () => {
  return (
    <Route
      path="/caixa"
      element={
        <LayoutMenu>
          <Outlet />
        </LayoutMenu>
      }
    >
      <Route index element={<CheckoutTableHistory />} />
      <Route path="movimentacao/:id" element={<CheckoutTable />} />
    </Route>
  );
};

export default CheckoutRoutes;
