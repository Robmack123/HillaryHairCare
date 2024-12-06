import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getServices } from "../../services/services";
import { updateAppointmentServices } from "../../services/appointments";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Table,
} from "reactstrap";

export const EditAppointmentServices = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    getServices().then(setServices);
  }, []);

  const handleServiceToggle = (serviceId) => {
    setSelectedServices(
      (prev) =>
        prev.includes(serviceId)
          ? prev.filter((id) => id !== serviceId) // Deselect service
          : [...prev, serviceId] // Select service
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateAppointmentServices(id, selectedServices)
      .then(() => {
        alert("Services updated successfully!");
        navigate("/appointments"); // Redirect back to the list
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Container>
      <h4>Edit Appointment Services</h4>
      <Form onSubmit={handleSubmit}>
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
          Update Services
        </Button>
      </Form>
    </Container>
  );
};
