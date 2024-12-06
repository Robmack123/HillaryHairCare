import { useEffect, useState } from "react";
import { getCustomers } from "../../services/customers";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";

export const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getCustomers().then((data) => setCustomers(data));
  }, []);

  return (
    <div className="container">
      <div className="sub-menu bg-light">
        <h4>Customers</h4>
        <Link to="/customers/add" className="btn btn-primary">
          Add Customers
        </Link>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
