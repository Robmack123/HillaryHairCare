import { useEffect, useState } from "react";
import { getAppointments } from "../../services/appointments";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";

export const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getAppointments().then((data) => {
      console.log(data);
      setAppointments(data);
    });
  }, []);

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
            <th></th>
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
                <Link to={`/appointments/${appointment.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
