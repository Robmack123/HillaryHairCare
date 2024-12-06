import { useEffect, useState } from "react";
import {
  getStylists,
  toggleStylistStatus,
  getStylistAppointments,
} from "../../services/stylists";
import { Table, Button } from "reactstrap";
import { StylistAppointmentsModal } from "./StylistAppointmentsModal";

export const StylistList = () => {
  const [stylists, setStylists] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetchStylists();
  }, []);

  const fetchStylists = () => {
    getStylists().then((data) => setStylists(data));
  };

  const handleToggleStatus = (stylistId, currentStatus) => {
    const newStatus = !currentStatus;

    toggleStylistStatus(stylistId, newStatus)
      .then(() => {
        alert(
          `Stylist ${newStatus ? "activated" : "deactivated"} successfully!`
        );
        fetchStylists();
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update stylist status. Please try again.");
      });
  };

  const viewAppointments = (stylistId, stylistName) => {
    getStylistAppointments(stylistId)
      .then((data) => {
        setAppointments(data);
        setSelectedStylist(stylistName);
        setModal(true);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load appointments. Please try again.");
      });
  };

  const toggleModal = () => setModal(!modal);

  return (
    <div className="container">
      <h4>Stylists</h4>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stylists.map((stylist) => (
            <tr key={stylist.id}>
              <td>{stylist.name}</td>
              <td>{stylist.specialization}</td>
              <td>{stylist.isActive ? "Active" : "Inactive"}</td>
              <td>
                <Button
                  color={stylist.isActive ? "danger" : "success"}
                  onClick={() =>
                    handleToggleStatus(stylist.id, stylist.isActive)
                  }
                  className="me-2"
                >
                  {stylist.isActive ? "Deactivate" : "Activate"}
                </Button>
                <Button
                  color="primary"
                  size="sm"
                  onClick={() => viewAppointments(stylist.id, stylist.name)}
                >
                  View Appointments
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Component */}
      <StylistAppointmentsModal
        isOpen={modal}
        toggle={toggleModal}
        stylistName={selectedStylist}
        appointments={appointments}
      />
    </div>
  );
};
