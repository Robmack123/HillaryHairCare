import { useEffect, useState } from "react";
import {
  getAppointments,
  cancelAppointment,
} from "../../services/appointments";
import { Link } from "react-router-dom";
import { Table, Button } from "reactstrap";

export const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    getAppointments().then((data) => {
      setAppointments(data);
    });
  };

  const handleCancel = (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      cancelAppointment(appointmentId)
        .then(() => {
          alert("Appointment canceled successfully");
          fetchAppointments(); // Refresh the list after cancellation
        })
        .catch((error) => {
          console.error(error);
          alert("Failed to cancel appointment");
        });
    }
  };

  return (
    <div className="container">
      <div className="sub-menu bg-light">
        <h4>Appointments</h4>
        <Link to="/appointments/create">Add</Link>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Client</th>
            <th>Service</th>
            <th>Stylist</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>
                {new Date(appointment.appointmentTime).toLocaleDateString()}
              </td>
              <td>
                {new Date(appointment.appointmentTime).toLocaleTimeString()}
              </td>
              <td>{appointment.customerName}</td>
              <td>
                {appointment.services && appointment.services.length > 0 ? (
                  appointment.services.map((service) => (
                    <div key={service.serviceId}>{service.name}</div>
                  ))
                ) : (
                  <em>No Services</em>
                )}
              </td>
              <td>{appointment.stylistName}</td>
              <td>{appointment.status}</td>
              <td>
                <Link
                  to={`/appointments/${appointment.id}`}
                  className="btn btn-primary btn-sm"
                >
                  Edit
                </Link>{" "}
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => handleCancel(appointment.id)}
                  disabled={appointment.status === "Canceled"}
                >
                  Cancel
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
