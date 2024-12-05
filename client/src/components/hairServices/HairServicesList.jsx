import { useEffect, useState } from "react";
import { getServices } from "../../services/services";
import { Table } from "reactstrap";

export const HairServicesList = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServices().then((data) => setServices(data));
  }, []);

  return (
    <div className="container">
      <h4>Services</h4>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.name}</td>
              <td>{service.description}</td>
              <td>${service.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};