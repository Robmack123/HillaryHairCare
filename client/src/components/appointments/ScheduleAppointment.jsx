import { useEffect, useState } from "react";
import { getCustomers } from "../../services/customers";
import { getServices } from "../../services/services";
import { getStylists } from "../../services/stylists";
import { createAppointment } from "../../services/appointments";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Label,
  Table,
  Input,
} from "reactstrap";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import styles for the date picker

export const ScheduleAppointment = () => {
  const [customers, setCustomers] = useState([]);
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [stylistId, setStylistId] = useState("");
  const [appointmentTime, setAppointmentTime] = useState(null); // Updated to use a Date object
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    getCustomers().then((data) => setCustomers(data));
    getStylists().then((data) => setStylists(data));
    getServices().then((data) => setServices(data));
  }, []);

  const handleServiceToggle = (serviceId) => {
    setSelectedServices((prev) => {
      const updated = prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId];
      console.log("Updated Selected Services:", updated); // Debugging
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!appointmentTime) {
      alert("Please select a valid date and time.");
      return;
    }

    const appointment = {
      customerId,
      stylistId,
      appointmentTime: appointmentTime.toISOString(), // Convert Date object to ISO string
      serviceIds: selectedServices,
    };

    createAppointment(appointment)
      .then(() => alert("Appointment scheduled successfully!"))
      .catch((error) => alert(error.message));
  };

  return (
    <Container>
      <h4>Schedule Appointment</h4>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="customer">Customer</Label>
          <Input
            id="customer"
            type="select"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          >
            <option value="">Select a Customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </Input>
        </FormGroup>

        <FormGroup>
          <Label for="stylist">Stylist</Label>
          <Input
            id="stylist"
            type="select"
            value={stylistId}
            onChange={(e) => setStylistId(e.target.value)}
          >
            <option value="">Select a Stylist</option>
            {stylists.map((stylist) => (
              <option key={stylist.id} value={stylist.id}>
                {stylist.name}
              </option>
            ))}
          </Input>
        </FormGroup>

        <FormGroup>
          <Label for="appointmentTime">Appointment Time</Label>
          <DatePicker
            selected={appointmentTime}
            onChange={(date) => setAppointmentTime(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="Select a date and time"
          />
        </FormGroup>

        <FormGroup>
          <Label>Services</Label>
          <Table bordered>
            <thead>
              <tr>
                <th>Select</th>
                <th>Service</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td>
                    <Input
                      type="checkbox"
                      checked={selectedServices.includes(service.id)}
                      onChange={() => handleServiceToggle(service.id)}
                    />
                  </td>
                  <td>{service.name}</td>
                  <td>${service.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </FormGroup>

        <Button type="submit" color="primary">
          Schedule Appointment
        </Button>
      </Form>
    </Container>
  );
};
