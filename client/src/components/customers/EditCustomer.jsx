import { useParams, useNavigate } from "react-router-dom";
import { getCustomerById, updateCustomer } from "../../services/customers";
import { useEffect, useState } from "react";
import { Form, FormGroup, Input, Label, Button, Container } from "reactstrap";

export const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the customer details
    getCustomerById(id)
      .then((data) => {
        setName(data.name);
        setEmail(data.email);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load customer details.");
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedCustomer = { name, email };

    updateCustomer(id, updatedCustomer)
      .then(() => {
        alert("Customer updated successfully!");
        navigate("/customers"); // Redirect to customer list
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to update customer. Please try again.");
      });
  };
  return (
    <Container>
      <h4>Edit Customer</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter customer's name"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter customer's email"
            required
          />
        </FormGroup>
        <Button type="submit" color="primary">
          Save Changes
        </Button>
        <Button
          color="secondary"
          onClick={() => navigate("/customers")}
          className="ms-2"
        >
          Cancel
        </Button>
      </Form>
    </Container>
  );
};
