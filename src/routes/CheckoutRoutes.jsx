import { Route } from "react-router-dom";
import CheckoutTableHistory from '../pages/checkout/History/HistoryCheckout';
import CheckoutTable from '../pages/checkout/Movement/CheckoutTable';

const CheckoutRoutes = () => {
    return (
        <Route path="/caixa">
            <Route index element={<CheckoutTableHistory />} />
            <Route path="movimentacao/:id" element={<CheckoutTable />} />
        </Route>
    );
}

export default CheckoutRoutes;