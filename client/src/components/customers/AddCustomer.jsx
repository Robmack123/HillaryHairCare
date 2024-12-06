import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { createCustomer } from "../../services/customers";

export const AddCustomer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCustomer = { name, email };

    createCustomer(newCustomer)
      .then(() => {
        alert("Customer added successfully!");
        navigate("/customers"); // Redirect to the customer list
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to add customer. Please try again.");
      });
  };

  return (
    <Container>
      <h4>Add New Customer</h4>
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
          Add Customer
        </Button>
      </Form>
    </Container>
  );
};
