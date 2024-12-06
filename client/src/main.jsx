import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppointmentList } from "./components/appointments/AppointmentList";
import { CustomerList } from "./components/customers/CustomerLIst";
import { StylistList } from "./components/stylists/StylistList";
import { HairServicesList } from "./components/hairServices/HairServicesList";
import { ScheduleAppointment } from "./components/appointments/ScheduleAppointment";
import { EditAppointmentServices } from "./components/appointments/EditAppointment";
import { AddCustomer } from "./components/customers/AddCustomer.Jsx";
import { EditCustomer } from "./components/customers/EditCustomer";
import { AddService } from "./components/hairServices/AddService";
import { EditService } from "./components/hairServices/EditService";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="appointments" element={<AppointmentList />} />
        <Route path="customers" element={<CustomerList />} />
        <Route path="stylists" element={<StylistList />} />
        <Route path="services" element={<HairServicesList />} />
        <Route path="appointments/create" element={<ScheduleAppointment />} />
        <Route
          path="appointments/:id/services"
          element={<EditAppointmentServices />}
        />
        <Route path="customers/add" element={<AddCustomer />} />
        <Route path="customers/:id/edit" element={<EditCustomer />} />
        <Route path="services/add" element={<AddService />} />
        <Route path="services/:id/edit" element={<EditService />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
