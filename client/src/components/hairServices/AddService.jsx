import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Label, Button, Container } from "reactstrap";
import { createService } from "../../services/services"; // Import the service API function

export const AddService = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newService = {
      name,
      description,
      price: parseFloat(price),
    };

    createService(newService)
      .then(() => {
        alert("Service added successfully!");
        navigate("/services"); // Redirect to the services list
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to add service. Please try again.");
      });
  };

  return (
    <Container>
      <h4>Add New Service</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Service Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter the service name"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            id="description"
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter the service description"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="price">Price</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter the price"
            required
          />
        </FormGroup>
        <Button type="submit" color="primary">
          Add Service
        </Button>
        <Button
          color="secondary"
          onClick={() => navigate("/services")}
          className="ms-2"
        >
          Cancel
        </Button>
      </Form>
    </Container>
  );
};
