import { useEffect, useState } from "react";
import { getStylists, toggleStylistStatus } from "../../services/stylists";
import { Table, Button } from "reactstrap";

export const StylistList = () => {
  const [stylists, setStylists] = useState([]);

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
        fetchStylists();
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update stylist status. Please try again.");
      });
  };

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
                >
                  {stylist.isActive ? "Deactivate" : "Activate"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
