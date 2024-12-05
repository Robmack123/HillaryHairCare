import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppointmentList } from "./components/appointments/AppointmentList";
import { CustomerList } from "./components/customers/CustomerLIst";
import { StylistList } from "./components/stylists/StylistList";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="appointments" element={<AppointmentList />} />
        <Route path="customers" element={<CustomerList />} />
        <Route path="stylists" element={<StylistList />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
