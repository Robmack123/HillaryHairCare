import { useEffect, useState } from "react";
import { getServices } from "../../services/services";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";

export const HairServicesList = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServices().then((data) => setServices(data));
  }, []);

  return (
    <div className="container">
      <div className="sub-menu bg-light">
        <h4>Services</h4>
        <Link to="/services/add" className="btn btn-primary">
          Add Service
        </Link>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th> {/* New column for actions */}
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.name}</td>
              <td>{service.description}</td>
              <td>${service.price.toFixed(2)}</td>
              <td>
                <Link
                  to={`/services/${service.id}/edit`}
                  className="btn btn-secondary btn-sm"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
