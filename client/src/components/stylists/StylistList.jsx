import { useEffect, useState } from "react";
import { getStylists } from "../../services/stylists";
import { Table } from "reactstrap";

export const StylistList = () => {
  const [stylists, setStylists] = useState([]);

  useEffect(() => {
    getStylists().then((data) => setStylists(data));
  }, []);

  return (
    <div className="container">
      <h4>Stylists</h4>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {stylists.map((stylist) => (
            <tr key={stylist.id}>
              <td>{stylist.name}</td>
              <td>{stylist.specialization}</td>
              <td>{stylist.isActive ? "Active" : "Inactive"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
