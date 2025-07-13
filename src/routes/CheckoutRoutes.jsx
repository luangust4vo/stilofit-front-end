import { Route } from "react-router-dom";
import CheckoutTable from "../pages/checkout/Movement/CheckoutTable";

const CheckoutRoutes = () => {
    return (
        <Route path="/caixa">
            <Route index element={<CheckoutTable />} />
        </Route>
    );
}

export default CheckoutRoutes;