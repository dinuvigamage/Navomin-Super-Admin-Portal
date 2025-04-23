import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/Dashboardlayout";
import Home from "./pages/Home";
// import DashboardPage from "./pages/DashboardPage.jsx";
import Signup from "./pages/CreditProfile.jsx";
import NormalOrdersBillingPage from "./pages/NormalOrdersBillingPage.jsx";
import PreOrder from "./pages/PreOrder.jsx";
import Billing from "./pages/BillingPage.jsx";
import NormalOrder from "./pages/NormalOrder.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CreditProfile from "./pages/CreditProfile.jsx";
import PendingPayment from "./pages/PendingPayment.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/preOrders" element={<PreOrder />} />
          <Route path="/normalOrders" element={<NormalOrder />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/creditProfile" element={<CreditProfile />} />
          <Route path="/pendingPayments" element={<PendingPayment />} />
          <Route
            path="/normalOrderBilling"
            element={<NormalOrdersBillingPage />}
          />
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
