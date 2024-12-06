import { Table, Modal, ModalHeader, ModalBody } from "reactstrap";

export const StylistAppointmentsModal = ({
  isOpen,
  toggle,
  stylistName,
  appointments,
}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Appointments for {stylistName}</ModalHeader>
      <ModalBody>
        {appointments.length > 0 ? (
          <Table bordered>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Time</th>
                <th>Status</th>
                <th>Services</th>
                <th>Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.appointmentId}>
                  <td>{appointment.customerName}</td>
                  <td>
                    {new Date(appointment.appointmentTime).toLocaleString()}
                  </td>
                  <td>{appointment.status}</td>
                  <td>
                    {appointment.services.map((service, index) => (
                      <div key={index}>
                        {service.serviceName} ($
                        {service.servicePrice.toFixed(2)})
                      </div>
                    ))}
                  </td>
                  <td>${appointment.totalCost.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No appointments found.</p>
        )}
      </ModalBody>
    </Modal>
  );
};
